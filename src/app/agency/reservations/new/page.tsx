'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewReservationPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [plots, setPlots] = useState([]);
    const [selectedPlot, setSelectedPlot] = useState<any>(null);
    const [calculation, setCalculation] = useState<any>(null);
    const [calculating, setCalculating] = useState(false);

    const [formData, setFormData] = useState({
        plotId: '',
        agentId: '', // TODO: Récupérer depuis auth
        clientFirstName: '',
        clientLastName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
        clientCIN: '',
        paymentType: 'INSTALLMENT',
        downPayment: 0,
    });

    useEffect(() => {
        fetchAvailablePlots();
    }, []);

    const fetchAvailablePlots = async () => {
        try {
            const response = await fetch('/api/plots?status=AVAILABLE');
            const data = await response.json();
            if (data.success) {
                setPlots(data.plots);
            }
        } catch (error) {
            console.error('Error fetching plots:', error);
        }
    };

    const handlePlotSelect = async (plot: any) => {
        setSelectedPlot(plot);
        setFormData({ ...formData, plotId: plot.id });

        // Calculer le prix automatiquement
        await calculatePrice(plot.id, formData.paymentType);
        setStep(2);
    };

    const calculatePrice = async (plotId: string, paymentType: string) => {
        setCalculating(true);
        try {
            const response = await fetch('/api/reservations/calculate-price', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plotId,
                    agentId: formData.agentId,
                    paymentType,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setCalculation(data.calculation);
                setFormData({
                    ...formData,
                    downPayment: data.calculation.finalPrice * 0.5, // 50% par défaut
                });
            }
        } catch (error) {
            console.error('Error calculating price:', error);
            alert('Erreur lors du calcul du prix');
        } finally {
            setCalculating(false);
        }
    };

    const handlePaymentTypeChange = async (type: string) => {
        setFormData({ ...formData, paymentType: type });
        if (selectedPlot) {
            await calculatePrice(selectedPlot.id, type);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                alert(`Réservation créée avec succès!\nNuméro: ${data.reservation.reservationNumber}`);

                // Ouvrir le contrat dans un nouvel onglet
                window.open(`/api/reservations/${data.reservation.id}/contract`, '_blank');

                // Rediriger vers la liste des réservations
                router.push('/agency/reservations');
            } else {
                alert(`Erreur: ${data.error}`);
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
            alert('Erreur lors de la création de la réservation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Nouvelle Réservation
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Créez une réservation de parcelle en 3 étapes
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center flex-1">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {s}
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className={`text-sm font-medium ${step >= s ? 'text-blue-600' : 'text-gray-500'
                                        }`}>
                                        {s === 1 && 'Sélection Parcelle'}
                                        {s === 2 && 'Informations Client'}
                                        {s === 3 && 'Paiement'}
                                    </p>
                                </div>
                                {s < 3 && (
                                    <div className={`h-1 flex-1 mx-4 ${step > s ? 'bg-blue-600' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 1: Sélection Parcelle */}
                {step === 1 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Sélectionnez une Parcelle</h2>

                        {plots.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {plots.map((plot: any) => (
                                    <button
                                        key={plot.id}
                                        onClick={() => handlePlotSelect(plot)}
                                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg">{plot.plotNumber}</h3>
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                                Disponible
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{plot.project?.name}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Surface: {plot.surfaceArea} m²</span>
                                            {plot.block && (
                                                <span className="text-gray-500">{plot.block}</span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 py-8">
                                Aucune parcelle disponible
                            </p>
                        )}
                    </div>
                )}

                {/* Step 2: Informations Client */}
                {step === 2 && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Informations du Client</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Parcelle sélectionnée: <strong>{selectedPlot?.plotNumber}</strong>
                            </p>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Prénom *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.clientFirstName}
                                        onChange={(e) => setFormData({ ...formData, clientFirstName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.clientLastName}
                                        onChange={(e) => setFormData({ ...formData, clientLastName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.clientEmail}
                                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Téléphone *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+221 77 123 45 67"
                                        value={formData.clientPhone}
                                        onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.clientAddress}
                                        onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        N° CIN
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1 23456789 0"
                                        value={formData.clientCIN}
                                        onChange={(e) => setFormData({ ...formData, clientCIN: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between pt-6">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Retour
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Continuer
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 3: Paiement */}
                {step === 3 && calculation && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Modalités de Paiement</h2>

                        {/* Type de Paiement */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Type de paiement
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => handlePaymentTypeChange('CASH')}
                                    className={`p-4 border-2 rounded-lg text-left transition ${formData.paymentType === 'CASH'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-semibold">💰 Comptant</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Rabais de 5% sur le prix de cession
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handlePaymentTypeChange('INSTALLMENT')}
                                    className={`p-4 border-2 rounded-lg text-left transition ${formData.paymentType === 'INSTALLMENT'
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="font-semibold">📅 Échelonné</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Paiement en plusieurs fois
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Récapitulatif Prix */}
                        {calculating ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-2 text-sm text-gray-600">Recalcul en cours...</p>
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="font-semibold mb-4">Récapitulatif</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Prix de cession</span>
                                        <span className="font-medium">{calculation.cessionPrice.toLocaleString()} FCFA</span>
                                    </div>
                                    {calculation.cashDiscount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Rabais comptant (5%)</span>
                                            <span className="font-medium">-{calculation.cashDiscount.toLocaleString()} FCFA</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Marge agence</span>
                                        <span className="font-medium">{calculation.agencyMargin.toLocaleString()} FCFA</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between text-lg font-bold">
                                        <span>Total à payer</span>
                                        <span className="text-blue-600">{calculation.finalPrice.toLocaleString()} FCFA</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Acompte */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Acompte (minimum 50%)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    required
                                    min={calculation.finalPrice * 0.5}
                                    max={calculation.finalPrice}
                                    value={formData.downPayment}
                                    onChange={(e) => setFormData({ ...formData, downPayment: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <span className="absolute right-4 top-2 text-gray-500">FCFA</span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Minimum: {(calculation.finalPrice * 0.5).toLocaleString()} FCFA
                            </p>
                        </div>

                        {/* Solde */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">Solde restant</span>
                                <span className="text-lg font-bold text-blue-600">
                                    {(calculation.finalPrice - formData.downPayment).toLocaleString()} FCFA
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between pt-6">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                disabled={loading}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Retour
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading || formData.downPayment < calculation.finalPrice * 0.5}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Création...' : 'Créer la Réservation'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
