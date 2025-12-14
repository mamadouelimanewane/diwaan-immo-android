// Script de seed pour le système de partenariat
// Données basées sur GREEN SYSTEM SA & MMOK GROUP

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedPartnershipSystem() {
    console.log('🏢 Démarrage du seed système de partenariat...\n');

    try {
        // 1. Créer le Promoteur GREEN SYSTEM
        console.log('📝 Création du promoteur GREEN SYSTEM SA...');
        const greenSystem = await prisma.developer.create({
            data: {
                legalName: 'GREEN SYSTEM SA',
                tradeName: 'Green System',
                rccm: 'SN DKR 2010 B10309',
                ninea: '00424505',
                address: 'MBAO Extension Lot 1604',
                city: 'Dakar',
                phone: '+221 77 XXX XX XX',
                email: 'contact@greensystem.sn',
                website: 'https://greensystem.sn',
                representativeName: 'Abdoul Aziz Sylla',
                representativeTitle: 'Gérant',
                representativePhone: '+221 77 XXX XX XX',
                representativeEmail: 'a.sylla@greensystem.sn',
                status: 'ACTIVE',
                verifiedAt: new Date(),
            },
        });
        console.log('✅ GREEN SYSTEM créé\n');

        // 2. Créer l'Agence MMOK GROUP
        console.log('📝 Création de l\'agence MMOK GROUP...');
        const mmokGroup = await prisma.realEstateAgency.create({
            data: {
                legalName: 'MMOK GROUP',
                tradeName: 'MMOK GROUP - Agence Immobilière',
                rccm: 'SN DKR 2022 A 25935',
                ninea: '009587546 1Y1',
                address: 'Ouest Foire Lot N°28 Immeuble Masha\'Allah',
                city: 'Dakar',
                floor: '6ème Etage',
                phone: '+221 77 YYY YY YY',
                email: 'contact@mmokgroup.sn',
                website: 'https://mmokgroup.sn',
                directorName: 'Ghislaine D Nicole SAMB',
                directorTitle: 'Directrice Générale',
                directorPhone: '+221 77 YYY YY YY',
                directorEmail: 'g.samb@mmokgroup.sn',
                status: 'ACTIVE',
                verifiedAt: new Date(),
            },
        });
        console.log('✅ MMOK GROUP créé\n');

        // 3. Créer des agents commerciaux pour MMOK GROUP
        console.log('📝 Création des agents commerciaux...');
        const agents = await prisma.commercialAgent.createMany({
            data: [
                {
                    agencyId: mmokGroup.id,
                    firstName: 'Fatou',
                    lastName: 'Diop',
                    email: 'fatou.diop@mmokgroup.sn',
                    phone: '+221 76 111 11 11',
                    status: 'ACTIVE',
                },
                {
                    agencyId: mmokGroup.id,
                    firstName: 'Moussa',
                    lastName: 'Ndiaye',
                    email: 'moussa.ndiaye@mmokgroup.sn',
                    phone: '+221 76 222 22 22',
                    status: 'ACTIVE',
                },
                {
                    agencyId: mmokGroup.id,
                    firstName: 'Aïssatou',
                    lastName: 'Fall',
                    email: 'aissatou.fall@mmokgroup.sn',
                    phone: '+221 76 333 33 33',
                    status: 'ACTIVE',
                },
            ],
        });
        console.log(`✅ ${agents.count} agents créés\n`);

        // 4. Créer le Projet "Sebi Renaissance"
        console.log('📝 Création du projet Sebi Renaissance...');
        const sebiRenaissance = await prisma.developerProject.create({
            data: {
                developerId: greenSystem.id,
                name: 'Sebi Renaissance',
                description: 'Lotissement moderne à Diamniadio avec infrastructures complètes. Parcelles viabilisées (eau, électricité) situées au cœur du Pôle Urbain de Diamniadio, à proximité de la gare TER.',
                location: 'Pôle Urbain de Diamniadio',
                commune: 'Diamniadio',
                city: 'Diamniadio',
                region: 'Dakar',
                totalPlots: 100,
                availablePlots: 100,
                status: 'ACTIVE',
                plannedStartDate: new Date('2024-01-01'),
                actualStartDate: new Date('2024-03-15'),
            },
        });
        console.log('✅ Projet Sebi Renaissance créé\n');

        // 5. Créer le Contrat de Partenariat
        console.log('📝 Création du contrat de partenariat...');
        const partnership = await prisma.partnership.create({
            data: {
                developerId: greenSystem.id,
                agencyId: mmokGroup.id,
                contractNumber: 'GS-MMOK-2025-001',
                startDate: new Date('2025-12-02'),
                endDate: new Date('2028-06-02'), // 30 mois
                initialDuration: 30,
                autoRenewal: true,
                renewalPeriod: 12,
                exclusive: false,
                commissionRate: null,
                cashDiscountRate: 5.0,
                priceRevisionPeriod: 3,
                minDownPaymentRate: 50.0,
                notificationDelay: 24,
                documentDelay: 72,
                refundDelay: 90,
                defaultPaymentThreshold: 3,
                cancellationNoticePeriod: 60,
                status: 'ACTIVE',
                signedAt: new Date('2025-12-02'),
            },
        });
        console.log('✅ Contrat de partenariat créé\n');

        // 6. Créer les Clauses Contractuelles
        console.log('📝 Création des clauses contractuelles...');
        const clauses = await prisma.contractClause.createMany({
            data: [
                {
                    partnershipId: partnership.id,
                    articleNumber: 'Article 1',
                    title: 'OBJET',
                    content: 'Le présent protocole a pour objet de définir les termes et conditions dans lesquels L\'AGENCE COMMERCIALE est mandatée par LE PROMOTEUR pour assurer la commercialisation, la vente et le suivi du recouvrement des prix de vente d\'un nombre de parcelles du lotissement « Sebi Renaissance », selon les modalités techniques et financières décrites en annexe.',
                    order: 1,
                    category: 'GENERAL',
                    mandatory: true,
                },
                {
                    partnershipId: partnership.id,
                    articleNumber: 'Article 3',
                    title: 'MANDAT ET EXCLUSIVITÉ',
                    content: 'LE PROMOTEUR confie à MMOK GROUP, qui accepte, un mandat non exclusif de commercialisation et de vente des parcelles désignées. LE PROMOTEUR se réserve expressément le droit de retirer, à tout moment et sans indemnité, toute parcelle non encore formellement réservée ou vendue après en avoir informé l\'AGENCE COMMERCIALE au moins 24h avant par écrit.',
                    order: 3,
                    category: 'GENERAL',
                    mandatory: true,
                },
                {
                    partnershipId: partnership.id,
                    articleNumber: 'Article 5',
                    title: 'PRIX DE VENTE ET RÉVISION',
                    content: 'Prix de cession : Phase de Lancement (2 mois) : Type A : 50 000 FCFA/m² ; Type B : 66 000 FCFA/m². Les prix de cession seront révisés par LE PROMOTEUR tous les trois (3) mois. L\'AGENCE COMMERCIALE est libre d\'appliquer la marge commerciale de son choix. Pour toute vente conclue avec un paiement intégral et comptant, LE PROMOTEUR accorde un rabais de 5% sur le prix de cession.',
                    order: 5,
                    category: 'FINANCIAL',
                    mandatory: true,
                },
                {
                    partnershipId: partnership.id,
                    articleNumber: 'Article 6',
                    title: 'OBLIGATIONS DE L\'AGENCE COMMERCIALE',
                    content: 'Notification de toute réservation dans les 24 heures. Versement d\'un acompte minimum de 50% du prix total de la parcelle pour validation. Transmission des dossiers clients sous 72 heures après solde. Assurer le suivi et le recouvrement du solde des prix de vente.',
                    order: 6,
                    category: 'OBLIGATIONS',
                    mandatory: true,
                },
                {
                    partnershipId: partnership.id,
                    articleNumber: 'Article 8',
                    title: 'DÉFAUT DE PAIEMENT ET ANNULATION',
                    content: 'En cas de défaut de paiement persistant (trois mois sans versement), LE PROMOTEUR pourra annuler le contrat. En cas de désistement du client ou du promoteur, remboursement selon les conditions définies.',
                    order: 8,
                    category: 'TERMINATION',
                    mandatory: true,
                },
                {
                    partnershipId: partnership.id,
                    articleNumber: 'Article 10',
                    title: 'CONFIDENTIALITÉ',
                    content: 'Les Parties s\'engagent à conserver confidentielles toutes les informations (commerciales, financières, techniques) dont elles pourraient avoir connaissance dans le cadre de l\'exécution du présent accord.',
                    order: 10,
                    category: 'CONFIDENTIALITY',
                    mandatory: true,
                },
            ],
        });
        console.log(`✅ ${clauses.count} clauses créées\n`);

        // 7. Créer les Parcelles (50 parcelles variées)
        console.log('📝 Création des parcelles...');

        const plotsData = [];

        // 30 parcelles TYPE_A (50,000 FCFA/m²)
        for (let i = 1; i <= 30; i++) {
            plotsData.push({
                projectId: sebiRenaissance.id,
                developerId: greenSystem.id,
                partnershipId: partnership.id,
                agencyId: mmokGroup.id,
                plotNumber: `A${String(i).padStart(3, '0')}`,
                block: `Îlot ${Math.ceil(i / 10)}`,
                lotNumber: String(i),
                surfaceArea: [150, 200, 250, 300, 350][Math.floor(Math.random() * 5)],
                status: 'AVAILABLE',
            });
        }

        // 20 parcelles TYPE_B (66,000 FCFA/m²)
        for (let i = 1; i <= 20; i++) {
            plotsData.push({
                projectId: sebiRenaissance.id,
                developerId: greenSystem.id,
                partnershipId: partnership.id,
                agencyId: mmokGroup.id,
                plotNumber: `B${String(i).padStart(3, '0')}`,
                block: `Îlot ${Math.ceil(i / 10) + 3}`,
                lotNumber: String(i),
                surfaceArea: [200, 250, 300, 350, 400][Math.floor(Math.random() * 5)],
                status: 'AVAILABLE',
            });
        }

        await prisma.developerPlot.createMany({ data: plotsData });
        console.log(`✅ ${plotsData.length} parcelles créées\n`);

        // 8. Mettre à jour le compteur de parcelles disponibles
        await prisma.developerProject.update({
            where: { id: sebiRenaissance.id },
            data: { availablePlots: plotsData.length },
        });

        console.log('═══════════════════════════════════════');
        console.log('✅ Seed partenariat terminé avec succès !');
        console.log('═══════════════════════════════════════\n');

        console.log('📊 Résumé :');
        console.log(`  - 1 Promoteur (GREEN SYSTEM)`);
        console.log(`  - 1 Agence (MMOK GROUP)`);
        console.log(`  - ${agents.count} Agents commerciaux`);
        console.log(`  - 1 Projet (Sebi Renaissance)`);
        console.log(`  - 1 Contrat de partenariat`);
        console.log(`  - ${clauses.count} Clauses contractuelles`);
        console.log(`  - ${plotsData.length} Parcelles (30 Type A + 20 Type B)`);
        console.log('');

    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        throw error;
    }
}

// Exécution
seedPartnershipSystem()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
