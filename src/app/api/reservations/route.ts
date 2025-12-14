import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculatePlotPrice } from '@/lib/pricing-calculator';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/reservations - Créer une nouvelle réservation
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            plotId,
            agentId,
            clientFirstName,
            clientLastName,
            clientEmail,
            clientPhone,
            clientAddress,
            clientCIN,
            paymentType,
            downPayment,
        } = body;

        // Validation
        if (!plotId || !clientFirstName || !clientLastName || !clientEmail || !clientPhone || !paymentType) {
            return NextResponse.json(
                { success: false, error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Vérifier que la parcelle est disponible
        const plot = await prisma.developerPlot.findUnique({
            where: { id: plotId },
            include: {
                project: true,
                developer: true,
                agency: true,
                partnership: true,
            },
        });

        if (!plot) {
            return NextResponse.json(
                { success: false, error: 'Parcelle non trouvée' },
                { status: 404 }
            );
        }

        if (plot.status !== 'AVAILABLE') {
            return NextResponse.json(
                { success: false, error: 'Parcelle déjà réservée ou vendue' },
                { status: 400 }
            );
        }

        // Calculer le prix automatiquement
        const calculation = await calculatePlotPrice({
            plotId,
            agentId,
            paymentType: paymentType as 'CASH' | 'INSTALLMENT',
        });

        // Vérifier acompte minimum (50%)
        const minDownPayment = calculation.finalPrice * 0.5;
        if (downPayment < minDownPayment) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Acompte minimum requis: ${minDownPayment.toLocaleString()} FCFA (50%)`,
                },
                { status: 400 }
            );
        }

        // Générer numéro de réservation
        const reservationNumber = `RES-${new Date().getFullYear()}-${String(
            Math.floor(Math.random() * 10000)
        ).padStart(4, '0')}`;

        // Créer la réservation
        const reservation = await prisma.plotReservation.create({
            data: {
                plotId,
                agencyId: plot.agencyId!,
                agentId,
                reservationNumber,
                clientFirstName,
                clientLastName,
                clientEmail,
                clientPhone,
                clientAddress,
                clientCIN,
                cessionPricePerSqm: calculation.cessionPricePerSqm,
                agencyMarginPerSqm: calculation.agencyMarginPerSqm,
                surfaceArea: calculation.surfaceArea,
                cessionPrice: calculation.cessionPrice,
                agencyMargin: calculation.agencyMargin,
                finalPrice: calculation.finalPrice,
                cashDiscount: calculation.cashDiscount,
                cashDiscountRate: calculation.cashDiscountRate,
                paymentType: paymentType as 'CASH' | 'INSTALLMENT',
                downPayment,
                balance: calculation.finalPrice - downPayment,
                totalPaid: downPayment,
                status: downPayment >= minDownPayment ? 'VALIDATED' : 'PENDING',
                validatedAt: downPayment >= minDownPayment ? new Date() : null,
                appliedPricingRuleId: calculation.appliedPricingRuleId,
                appliedMarginConfigId: calculation.appliedMarginConfigId,
                calculationDetails: calculation.breakdown,
            },
        });

        // Mettre à jour le statut de la parcelle
        await prisma.developerPlot.update({
            where: { id: plotId },
            data: {
                status: 'RESERVED',
                reservedAt: new Date(),
            },
        });

        // Créer la commission agent si applicable
        if (agentId && calculation.agentCommission) {
            await prisma.agentCommission.create({
                data: {
                    reservationId: reservation.id,
                    agentId,
                    structureId: calculation.commissionStructureId,
                    baseAmount: calculation.agencyMargin,
                    commissionAmount: calculation.agentCommission,
                    totalCommission: calculation.agentCommission,
                    status: 'PENDING',
                },
            });
        }

        // Envoyer email de confirmation au client
        try {
            await resend.emails.send({
                from: 'Diwaan <noreply@diwaan.sn>',
                to: clientEmail,
                subject: `Confirmation de réservation - ${reservationNumber}`,
                html: `
          <h1>Confirmation de Réservation</h1>
          <p>Bonjour ${clientFirstName} ${clientLastName},</p>
          <p>Votre réservation a été créée avec succès !</p>
          
          <h2>Détails de la réservation</h2>
          <ul>
            <li><strong>Numéro:</strong> ${reservationNumber}</li>
            <li><strong>Projet:</strong> ${plot.project.name}</li>
            <li><strong>Parcelle:</strong> ${plot.plotNumber}</li>
            <li><strong>Surface:</strong> ${plot.surfaceArea} m²</li>
            <li><strong>Prix total:</strong> ${calculation.finalPrice.toLocaleString()} FCFA</li>
            <li><strong>Acompte versé:</strong> ${downPayment.toLocaleString()} FCFA</li>
            <li><strong>Solde restant:</strong> ${(calculation.finalPrice - downPayment).toLocaleString()} FCFA</li>
          </ul>
          
          <p>Merci de votre confiance !</p>
          <p>L'équipe Diwaan</p>
        `,
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        // Notifier le promoteur
        try {
            await resend.emails.send({
                from: 'Diwaan <noreply@diwaan.sn>',
                to: plot.developer.email,
                subject: `Nouvelle réservation - ${reservationNumber}`,
                html: `
          <h1>Nouvelle Réservation</h1>
          <p>Une nouvelle réservation a été créée par ${plot.agency?.legalName}.</p>
          
          <h2>Détails</h2>
          <ul>
            <li><strong>Numéro:</strong> ${reservationNumber}</li>
            <li><strong>Projet:</strong> ${plot.project.name}</li>
            <li><strong>Parcelle:</strong> ${plot.plotNumber}</li>
            <li><strong>Client:</strong> ${clientFirstName} ${clientLastName}</li>
            <li><strong>Prix cession:</strong> ${calculation.cessionPrice.toLocaleString()} FCFA</li>
            <li><strong>Acompte:</strong> ${downPayment.toLocaleString()} FCFA</li>
          </ul>
        `,
            });
        } catch (emailError) {
            console.error('Error sending developer notification:', emailError);
        }

        return NextResponse.json(
            {
                success: true,
                reservation: {
                    ...reservation,
                    plot: {
                        plotNumber: plot.plotNumber,
                        project: plot.project.name,
                    },
                },
                calculation,
                message: 'Réservation créée avec succès',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating reservation:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de la réservation' },
            { status: 500 }
        );
    }
}

// GET /api/reservations - Liste toutes les réservations
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const agencyId = searchParams.get('agencyId');

        const reservations = await prisma.plotReservation.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(agencyId && { agencyId }),
            },
            orderBy: { createdAt: 'desc' },
            include: {
                plot: {
                    select: {
                        plotNumber: true,
                        block: true,
                        surfaceArea: true,
                        project: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                agency: {
                    select: {
                        legalName: true,
                    },
                },
                agent: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
                payments: true,
                _count: {
                    select: {
                        payments: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            reservations,
            count: reservations.length,
        });
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la récupération des réservations' },
            { status: 500 }
        );
    }
}
