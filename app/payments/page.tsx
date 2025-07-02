'use client'

import { Check, HelpCircle, Dumbbell, Shield, Zap } from 'lucide-react';
import Script from 'next/script'
import React from 'react'
import { useState } from 'react'

declare global {
    interface Window {
        Razorpay: {
            new(options: RazorpayOptions): {
                open(): void;
            };
        };
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface Package {
    id: string;
    name: string;
    description: string;
    price: number;
    isRecommended?: boolean;
    features: string[];
}

const packages: Package[] = [
    {
        id: 'saver',
        name: 'Saver Plan',
        description: 'Perfect for budget travelers seeking essential comforts',
        price: 999,
        features: [
          'Standard room with queen bed',
          'Complimentary Wi-Fi',
          'Access to hotel gym',
          'In-room tea/coffee maker',
          '24-hour front desk',
          'Daily housekeeping',
          'Two bottles of mineral water per day',
          'Basic toiletries kit'
        ]
      },
      {
        id: 'pro',
        name: 'Pro Plan',
        description: 'Ideal for guests wanting enhanced amenities and services',
        price: 1999,
        isRecommended: true,
        features: [
          'All Saver features',
          'Premium room with king bed',
          'Complimentary breakfast buffet',
          'Late checkout option',
          'Airport shuttle service',
          'Complimentary laundry for select items',
          'In-room minibar',
          'Priority room service'
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Plan',
        description: 'Luxurious stay with exclusive premium experiences',
        price: 2999,
        features: [
          'All Pro features',
          'Executive suite with lounge access',
          'Personal butler service',
          'Spa access with complimentary massage',
          'Private airport transfer',
          'Daily turndown service with evening treats',
          'Complimentary fine-dining dinner',
          'Priority reservation for hotel amenities'
        ]
      }
];

const PaymentPage = () => {
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [processingStates, setProcessingStates] = useState<Record<string, boolean>>({});

    const handlePayment = async (pkg: Package) => {
        setSelectedPackage(pkg.id);
        setProcessingStates(prev => ({ ...prev, [pkg.id]: true }));

        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: pkg.price * 100
                })
            });
            const data = await response.json();

            if (!process.env.NEXT_PUBLIC_KEY_ID) {
                throw new Error('Razorpay key is not configured');
            }

            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_KEY_ID,
                amount: pkg.price * 100,
                currency: "INR",
                name: "Hotel Booking",
                description: `${pkg.name} Room Booking`,
                order_id: data.orderId,
                handler: function (response: RazorpayResponse) {
                    console.log("Payment successful:", response);
                    alert(`Payment successful! Welcome to your ${pkg.name} stay!`);
                    setProcessingStates(prev => ({ ...prev, [pkg.id]: false }));
                    setSelectedPackage(null);
                },
                prefill: {
                    name: "User",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#10b981"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch(error) {
            console.error("Error creating order:", error);
            alert("Error processing payment. Please try again.");
            setSelectedPackage(null);
        } finally {
            setProcessingStates(prev => ({ ...prev, [pkg.id]: false }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="text-center mb-12 mt-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Choose Your Hotel Journey
                    </h1>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="group relative h-full"
                            onClick={() => !processingStates[pkg.id] && setSelectedPackage(pkg.id)}
                        >
                            <div className={`relative h-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg transition-all duration-300 p-8 flex flex-col justify-between ${
                                selectedPackage === pkg.id 
                                    ? 'ring-2 ring-emerald-500 transform -translate-y-1' 
                                    : 'hover:-translate-y-1'
                            }`}>
                                <div className="flex flex-col h-full">
                                    {pkg.isRecommended && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-4 mb-6">
                                        {pkg.id === 'saver' && <Shield className="w-8 h-8 text-emerald-500" />}
                                        {pkg.id === 'pro' && <Dumbbell className="w-8 h-8 text-emerald-500" />}
                                        {pkg.id === 'advanced' && <Zap className="w-8 h-8 text-emerald-500" />}
                                        <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                                    </div>

                                    <p className="text-gray-600 mb-6">{pkg.description}</p>

                                    <div className="mb-8">
                                        <span className="text-4xl font-bold text-emerald-600">₹{pkg.price}</span>
                                        <span className="text-gray-500 ml-2">/night</span>
                                    </div>

                                    <div className="space-y-4">
                                        {pkg.features.map((feature, index) => (
                                            <div key={index} className="flex items-center text-gray-700">
                                                <Check className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePayment(pkg);
                                        }}
                                        disabled={processingStates[pkg.id]}
                                        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                                            processingStates[pkg.id]
                                                ? 'bg-gray-200 cursor-not-allowed'
                                                : selectedPackage === pkg.id
                                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                                                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                        }`}
                                    >
                                        {processingStates[pkg.id] ? 'Processing...' : 'Get Started'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Support */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        Need help choosing the right plan?
                    </p>
                    <button className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700">
                        Contact Support
                        <HelpCircle className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;