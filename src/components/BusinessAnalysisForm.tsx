
import React from 'react';
import { useBusinessAnalysis } from '@/hooks/business-analysis';

import BusinessAnalysisFormContainer from './business-analysis/BusinessAnalysisFormContainer';
import StepIndicator from './business-analysis/StepIndicator';
import BusinessInfoForm from './business-analysis/BusinessInfoForm';
import DigitalPresenceForm from './business-analysis/DigitalPresenceForm';
import BusinessChallengesForm from './business-analysis/BusinessChallengesForm';
import ResultsView from './business-analysis/ResultsView';

interface BusinessAnalysisFormProps {
  onClose: () => void;
}

const BusinessAnalysisForm: React.FC<BusinessAnalysisFormProps> = ({ onClose }) => {
  const { 
    state, 
    goToNextStep, 
    goToPrevStep, 
    handleSubmitForm 
  } = useBusinessAnalysis(onClose);
  
  const { step, formData, recommendedServices, aiAnalysisResult, isAnalyzing } = state;
  
  return (
    <BusinessAnalysisFormContainer 
      title={step === 4 ? "Rekomendasi Layanan" : "Analisa Bisnis Anda"}
      onClose={onClose}
    >
      {step < 4 && <StepIndicator currentStep={step} totalSteps={3} />}
      
      {step === 1 && (
        <BusinessInfoForm 
          defaultValues={formData} 
          onNext={(data) => goToNextStep(data)}
        />
      )}
      
      {step === 2 && (
        <DigitalPresenceForm
          defaultValues={formData}
          onNext={(data) => goToNextStep(data)}
          onPrev={goToPrevStep}
        />
      )}
      
      {step === 3 && (
        <BusinessChallengesForm
          defaultValues={formData}
          onNext={(data) => goToNextStep(data)}
          onPrev={goToPrevStep}
        />
      )}
      
      {step === 4 && (
        <ResultsView
          formData={formData}
          aiAnalysisResult={aiAnalysisResult}
          recommendedServices={recommendedServices}
          isAnalyzing={isAnalyzing}
          onSubmit={handleSubmitForm}
        />
      )}
    </BusinessAnalysisFormContainer>
  );
};

export default BusinessAnalysisForm;
