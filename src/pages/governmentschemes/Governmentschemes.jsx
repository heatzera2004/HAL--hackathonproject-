import React from 'react';
import Layout from '../../components/layout/Layout';

const schemes = [
    {
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        description: "This scheme provides insurance coverage and financial support to farmers in the event of crop failure.",
        link: "https://pmfby.gov.in/"
    },
    {
        name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
        description: "This scheme aims to improve on-farm water use efficiency through various means including micro-irrigation.",
        link: "https://pmksy.gov.in/"
    },
    {
        name: "Soil Health Card Scheme",
        description: "This scheme promotes sustainable farming by providing farmers with soil health cards to improve soil quality.",
        link: "https://soilhealth.dac.gov.in/"
    },
    {
        name: "National Agriculture Market (e-NAM)",
        description: "This scheme is an online trading platform that promotes better price discovery and marketing of agricultural produce.",
        link: "https://www.enam.gov.in/web/"
    },
    {
        name: "Rashtriya Krishi Vikas Yojana (RKVY)",
        description: "This scheme provides financial assistance to states to develop agriculture and allied sectors.",
        link: "https://rkvy.nic.in/"
    }
];

const Governmentschemes = () => {
    return (
        <Layout>
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">Government Schemes on Agriculture</h1>
            <div className="space-y-6">
                {schemes.map((scheme, index) => (
                    <div key={index} className="p-4 bg-green-100 rounded shadow">
                        <h2 className="text-2xl font-semibold text-green-800">{scheme.name}</h2>
                        <p className="mt-2 text-green-700">{scheme.description}</p>
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline mt-4 block">
                            Learn more
                        </a>
                    </div>
                ))}
            </div>
        </div>
        </Layout>
    );
}

export default Governmentschemes;
