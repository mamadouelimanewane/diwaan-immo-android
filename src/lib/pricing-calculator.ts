// Utilitaire pour calculer automatiquement les prix, marges et commissions
// Basé sur le système de partenariat flexible

import prisma from './prisma';

interface CalculationInput {
    plotId: string;
    agentId?: string;
    paymentType: 'CASH' | 'INSTALLMENT';
}

interface CalculationResult {
    // Prix
    cessionPricePerSqm: number;
    agencyMarginPerSqm: number;
    finalPricePerSqm: number;

    // Totaux
    cessionPrice: number;
    agencyMargin: number;
    finalPrice: number;

    // Rabais
    cashDiscount: number;
    cashDiscountRate: number;

    // Commission agent
    agentCommission?: number;

    // Détails
    surfaceArea: number;
    appliedPricingRuleId?: string;
    appliedMarginConfigId?: string;
    commissionStructureId?: string;

    // Breakdown complet
    breakdown: {
        pricingRule: any;
        marginConfig: any;
        commissionStructure?: any;
        calculations: any;
    };
}

/**
 * Calcule automatiquement le prix final d'une parcelle
 * en appliquant les règles de prix, marges et commissions
 */
export async function calculatePlotPrice(
    input: CalculationInput
): Promise<CalculationResult> {
    try {
        // 1. Récupérer la parcelle avec toutes les infos
        const plot = await prisma.developerPlot.findUnique({
            where: { id: input.plotId },
            include: {
                project: true,
                developer: true,
                agency: true,
                partnership: true,
                plotTypeConfig: true,
            },
        });

        if (!plot) {
            throw new Error('Parcelle non trouvée');
        }

        // 2. Trouver la règle de prix applicable
        const pricingRule = await findBestPricingRule({
            plotTypeConfigId: plot.plotTypeConfigId,
            agencyId: plot.agencyId,
            partnershipId: plot.partnershipId,
            projectId: plot.projectId,
            developerId: plot.developerId,
            surfaceArea: plot.surfaceArea,
            currentDate: new Date(),
        });

        if (!pricingRule) {
            throw new Error('Aucune règle de prix applicable');
        }

        // 3. Calculer prix de cession
        let cessionPricePerSqm = pricingRule.cessionPricePerSqm;
        let cessionPrice = cessionPricePerSqm * plot.surfaceArea;

        // 4. Appliquer rabais comptant si applicable
        let cashDiscount = 0;
        let cashDiscountRate = 0;

        if (input.paymentType === 'CASH' && pricingRule.cashDiscountRate) {
            cashDiscountRate = pricingRule.cashDiscountRate;
            cashDiscount = cessionPrice * (cashDiscountRate / 100);
            cessionPrice -= cashDiscount;
            cessionPricePerSqm = cessionPrice / plot.surfaceArea;
        }

        // 5. Trouver configuration marge
        const marginConfig = await findBestMarginConfig({
            agentId: input.agentId,
            agencyId: plot.agencyId,
            plotTypeConfigId: plot.plotTypeConfigId,
            surfaceArea: plot.surfaceArea,
            cessionPrice,
        });

        // 6. Calculer marge agence
        const agencyMarginPerSqm = calculateMargin(marginConfig, {
            surfaceArea: plot.surfaceArea,
            cessionPrice,
            agentId: input.agentId,
        });

        const agencyMargin = agencyMarginPerSqm * plot.surfaceArea;

        // 7. Prix final
        const finalPrice = cessionPrice + agencyMargin;
        const finalPricePerSqm = finalPrice / plot.surfaceArea;

        // 8. Calculer commission agent si applicable
        let agentCommission = 0;
        let commissionStructure = null;

        if (input.agentId) {
            commissionStructure = await findAgentCommission(input.agentId);
            if (commissionStructure) {
                agentCommission = calculateCommission(commissionStructure, {
                    totalSale: finalPrice,
                    agencyMargin,
                    cessionPrice,
                    surfaceArea: plot.surfaceArea,
                });
            }
        }

        // 9. Sauvegarder le calcul dans l'historique
        await prisma.priceCalculationHistory.create({
            data: {
                plotId: plot.id,
                surfaceArea: plot.surfaceArea,
                requestedBy: input.agentId || 'system',
                pricingRuleId: pricingRule.id,
                marginConfigId: marginConfig?.id,
                cessionPricePerSqm,
                agencyMarginPerSqm,
                finalPricePerSqm,
                cessionPrice,
                agencyMargin,
                finalPrice,
                calculationBreakdown: {
                    input,
                    pricingRule,
                    marginConfig,
                    commissionStructure,
                    cashDiscount,
                    cashDiscountRate,
                    agentCommission,
                    timestamp: new Date().toISOString(),
                },
            },
        });

        return {
            cessionPricePerSqm,
            agencyMarginPerSqm,
            final PricePerSqm,
            cessionPrice,
            agencyMargin,
            finalPrice,
            cashDiscount,
            cashDiscountRate,
            agentCommission: agentCommission > 0 ? agentCommission : undefined,
            surfaceArea: plot.surfaceArea,
            appliedPricingRuleId: pricingRule.id,
            appliedMarginConfigId: marginConfig?.id,
            commissionStructureId: commissionStructure?.id,
            breakdown: {
                pricingRule,
                marginConfig,
                commissionStructure,
                calculations: {
                    steps: [
                        { step: 1, desc: 'Prix de base', value: pricingRule.cessionPricePerSqm * plot.surfaceArea },
                        { step: 2, desc: 'Rabais comptant', value: -cashDiscount },
                        { step: 3, desc: 'Prix cession', value: cessionPrice },
                        { step: 4, desc: 'Marge agence', value: agencyMargin },
                        { step: 5, desc: 'Prix final', value: finalPrice },
                        { step: 6, desc: 'Commission agent', value: agentCommission },
                    ],
                },
            },
        };
    } catch (error) {
        console.error('Erreur calcul prix:', error);
        throw error;
    }
}

/**
 * Trouve la meilleure règle de prix applicable
 * (priorité la plus haute)
 */
async function findBestPricingRule(criteria: {
    plotTypeConfigId?: string | null;
    agencyId?: string | null;
    partnershipId?: string | null;
    projectId?: string;
    developerId?: string;
    surfaceArea: number;
    currentDate: Date;
}): Promise<any> {
    const rules = await prisma.pricingRule.findMany({
        where: {
            active: true,
            validFrom: { lte: criteria.currentDate },
            OR: [
                { validUntil: null },
                { validUntil: { gte: criteria.currentDate } },
            ],
            AND: [
                {
                    OR: [
                        { plotTypeConfigId: criteria.plotTypeConfigId },
                        { plotTypeConfigId: null },
                    ],
                },
                {
                    OR: [
                        { agencyId: criteria.agencyId },
                        { agencyId: null },
                    ],
                },
                {
                    OR: [
                        { partnershipId: criteria.partnershipId },
                        { partnershipId: null },
                    ],
                },
                {
                    OR: [
                        { projectId: criteria.projectId },
                        { projectId: null },
                    ],
                },
                {
                    OR: [
                        { minSurface: null },
                        { minSurface: { lte: criteria.surfaceArea } },
                    ],
                },
                {
                    OR: [
                        { maxSurface: null },
                        { maxSurface: { gte: criteria.surfaceArea } },
                    ],
                },
            ],
        },
        orderBy: { priority: 'desc' },
    });

    return rules[0] || null;
}

/**
 * Trouve la meilleure configuration de marge
 */
async function findBestMarginConfig(criteria: {
    agentId?: string;
    agencyId?: string | null;
    plotTypeConfigId?: string | null;
    surfaceArea: number;
    cessionPrice: number;
}): Promise<any> {
    const configs = await prisma.marginConfig.findMany({
        where: {
            active: true,
            AND: [
                {
                    OR: [
                        { agentId: criteria.agentId },
                        { agentId: null },
                    ],
                },
                {
                    OR: [
                        { agencyId: criteria.agencyId },
                        { agencyId: null },
                    ],
                },
                {
                    OR: [
                        { plotTypeConfigId: criteria.plotTypeConfigId },
                        { plotTypeConfigId: null },
                    ],
                },
                {
                    OR: [
                        { minSurface: null },
                        { minSurface: { lte: criteria.surfaceArea } },
                    ],
                },
                {
                    OR: [
                        { maxSurface: null },
                        { maxSurface: { gte: criteria.surfaceArea } },
                    ],
                },
            ],
        },
    });

    // Priorité: agent > agence > général
    return (
        configs.find(c => c.agentId === criteria.agentId) ||
        configs.find(c => c.agencyId === criteria.agencyId) ||
        configs[0] ||
        null
    );
}

/**
 * Calcule la marge selon la configuration
 */
function calculateMargin(
    config: any,
    context: {
        surfaceArea: number;
        cessionPrice: number;
        agentId?: string;
    }
): number {
    if (!config) {
        return 10000; // Marge par défaut: 10,000 FCFA/m²
    }

    switch (config.marginType) {
        case 'PER_SQM':
            return config.marginPerSqm || 10000;

        case 'PERCENTAGE':
            return (context.cessionPrice * (config.marginValue / 100)) / context.surfaceArea;

        case 'FIXED_AMOUNT':
            return config.marginValue / context.surfaceArea;

        case 'TIERED':
            if (config.tieredMargin) {
                const tiers = config.tieredMargin as Array<{ min: number; max: number; marginPerSqm: number }>;
                const tier = tiers.find(
                    t => context.surfaceArea >= t.min && context.surfaceArea < t.max
                );
                return tier?.marginPerSqm || 10000;
            }
            return 10000;

        default:
            return 10000;
    }
}

/**
 * Trouve la structure de commission d'un agent
 */
async function findAgentCommission(agentId: string): Promise<any> {
    const structures = await prisma.commissionStructure.findMany({
        where: {
            active: true,
            OR: [
                { agentId },
                { agentId: null },
            ],
        },
    });

    return structures.find(s => s.agentId === agentId) || structures[0] || null;
}

/**
 * Calcule la commission d'un agent
 */
function calculateCommission(
    structure: any,
    context: {
        totalSale: number;
        agencyMargin: number;
        cessionPrice: number;
        surfaceArea: number;
    }
): number {
    if (!structure) return 0;

    // Déterminer la base de calcul
    let baseAmount = 0;
    switch (structure.baseCalculation) {
        case 'TOTAL_SALE':
            baseAmount = context.totalSale;
            break;
        case 'AGENCY_MARGIN':
            baseAmount = context.agencyMargin;
            break;
        case 'CESSION_PRICE':
            baseAmount = context.cessionPrice;
            break;
        default:
            baseAmount = context.agencyMargin;
    }

    // Calculer la commission
    switch (structure.commissionType) {
        case 'PERCENTAGE':
            return baseAmount * (structure.rate / 100);

        case 'FIXED':
            return structure.fixedAmount || 0;

        case 'PER_SQM':
            return (structure.amountPerSqm || 0) * context.surfaceArea;

        case 'TIERED':
            if (structure.tiers) {
                const tiers = structure.tiers as Array<{ min: number; max: number; rate: number }>;
                const tier = tiers.find(
                    t => baseAmount >= t.min && baseAmount < (t.max || Infinity)
                );
                return tier ? baseAmount * (tier.rate / 100) : 0;
            }
            return 0;

        default:
            return 0;
    }
}

export {
    findBestPricingRule,
    findBestMarginConfig,
    calculateMargin,
    calculateCommission,
};
