import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateReservationContractHTML } from '@/lib/pdf-generator';

// GET /api/reservations/[id]/contract - Générer le contrat de réservation en HTML/PDF
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const reservation = await prisma.plotReservation.findUnique({
            where: { id: params.id },
            include: {
                plot: {
                    include: {
                        project: true,
                        developer: true,
                    },
                },
                agency: true,
                agent: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });

        if (!reservation) {
            return NextResponse.json(
                { success: false, error: 'Réservation non trouvée' },
                { status: 404 }
            );
        }

        // Générer le HTML du contrat
        const contractHTML = generateReservationContractHTML({
            reservationNumber: reservation.reservationNumber,
            date: reservation.createdAt,

            clientFirstName: reservation.clientFirstName,
            clientLastName: reservation.clientLastName,
            clientEmail: reservation.clientEmail,
            clientPhone: reservation.clientPhone,
            clientAddress: reservation.clientAddress || undefined,
            clientCIN: reservation.clientCIN || undefined,

            plotNumber: reservation.plot.plotNumber,
            block: reservation.plot.block || undefined,
            surfaceArea: reservation.surfaceArea,
            projectName: reservation.plot.project.name,
            projectLocation: reservation.plot.project.location,

            cessionPricePerSqm: reservation.cessionPricePerSqm,
            agencyMarginPerSqm: reservation.agencyMarginPerSqm,
            finalPricePerSqm: reservation.finalPrice / reservation.surfaceArea,
            cessionPrice: reservation.cessionPrice,
            agencyMargin: reservation.agencyMargin,
            finalPrice: reservation.finalPrice,
            cashDiscount: reservation.cashDiscount,

            paymentType: reservation.paymentType === 'CASH' ? 'CASH' : 'INSTALLMENT',
            downPayment: reservation.downPayment,
            balance: reservation.balance,

            agencyName: reservation.agency.legalName,
            agencyAddress: reservation.agency.address,
            agencyPhone: reservation.agency.phone,
            agencyEmail: reservation.agency.email,

            developerName: reservation.plot.developer.legalName,
            developerAddress: reservation.plot.developer.address,
        });

        // Retourner le HTML avec le bon content-type
        return new NextResponse(contractHTML, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Disposition': `inline; filename="contrat-${reservation.reservationNumber}.html"`,
            },
        });
    } catch (error) {
        console.error('Error generating contract:', error);
        return NextResponse.json(
            { success: false, error: 'Erreur lors de la génération du contrat' },
            { status: 500 }
        );
    }
}
