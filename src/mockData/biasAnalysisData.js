// Mock data for bias analysis in recruitment process
const biasAnalysisData = {
  // Data for each job
  'job1': {
    biasMetrics: {
      gender: {
        score: 0.82,
        status: 'Fair',
        beforeMitigation: 0.68,
        improvement: '+14%'
      },
      age: {
        score: 0.75,
        status: 'Fair',
        beforeMitigation: 0.62,
        improvement: '+13%'
      },
      ethnicity: {
        score: 0.90,
        status: 'Excellent',
        beforeMitigation: 0.78,
        improvement: '+12%'
      }
    },
    algorithmAdjustments: [
      'Applied demographic parity constraint',
      'Used balanced training data',
      'Implemented fairness-aware feature selection',
      'Applied bias mitigation techniques'
    ],
    fairnessImprovements: {
      selectionRate: {
        beforeMitigation: {
          male: '68%',
          female: '42%',
          difference: '26%'
        },
        afterMitigation: {
          male: '64%',
          female: '58%',
          difference: '6%'
        }
      },
      datasetRebalance: 'Applied class balancing techniques to training data',
      featuresRemoved: ['Name', 'Gender', 'Age', 'Address', 'University name'],
      modelAdapted: 'Used Adversarial Debiasing technique'
    }
  },
  'job2': {
    biasMetrics: {
      gender: {
        score: 0.78,
        status: 'Fair',
        beforeMitigation: 0.63,
        improvement: '+15%'
      },
      age: {
        score: 0.85,
        status: 'Excellent',
        beforeMitigation: 0.71,
        improvement: '+14%'
      },
      ethnicity: {
        score: 0.81,
        status: 'Fair',
        beforeMitigation: 0.69,
        improvement: '+12%'
      }
    },
    algorithmAdjustments: [
      'Applied equal opportunity constraint',
      'Implemented fair representation learning',
      'Used counterfactual fairness techniques',
      'Applied ensemble fairness methods'
    ],
    fairnessImprovements: {
      selectionRate: {
        beforeMitigation: {
          under30: '65%',
          over45: '38%',
          difference: '27%'
        },
        afterMitigation: {
          under30: '59%',
          over45: '52%',
          difference: '7%'
        }
      },
      datasetRebalance: 'Applied SMOTE for minority groups in training data',
      featuresRemoved: ['Graduation year', 'Photo', 'Date of birth', 'Marital status'],
      modelAdapted: 'Used Prejudice Remover regularization'
    }
  },
  'job3': {
    biasMetrics: {
      gender: {
        score: 0.92,
        status: 'Excellent',
        beforeMitigation: 0.75,
        improvement: '+17%'
      },
      age: {
        score: 0.88,
        status: 'Excellent',
        beforeMitigation: 0.73,
        improvement: '+15%'
      },
      ethnicity: {
        score: 0.85,
        status: 'Excellent',
        beforeMitigation: 0.70,
        improvement: '+15%'
      }
    },
    algorithmAdjustments: [
      'Implemented equalized odds constraint',
      'Applied fairness-aware data preprocessing',
      'Used adversarial debiasing techniques',
      'Implemented model explanations for transparency'
    ],
    fairnessImprovements: {
      selectionRate: {
        beforeMitigation: {
          whiteCandidate: '72%',
          minorityCandidate: '48%',
          difference: '24%'
        },
        afterMitigation: {
          whiteCandidate: '68%',
          minorityCandidate: '62%',
          difference: '6%'
        }
      },
      datasetRebalance: 'Used synthetic data generation for underrepresented groups',
      featuresRemoved: ['Race', 'Cultural indicators', 'Nationality', 'Language proficiency'],
      modelAdapted: 'Used FairLearn toolkit with constraints'
    }
  },
  'job4': {
    biasMetrics: {
      gender: {
        score: 0.80,
        status: 'Fair',
        beforeMitigation: 0.65,
        improvement: '+15%'
      },
      age: {
        score: 0.82,
        status: 'Fair',
        beforeMitigation: 0.70,
        improvement: '+12%'
      },
      ethnicity: {
        score: 0.78,
        status: 'Fair',
        beforeMitigation: 0.62,
        improvement: '+16%'
      }
    },
    algorithmAdjustments: [
      'Applied disparate impact constraints',
      'Used fairness-aware data sampling',
      'Implemented calibrated score outputs',
      'Applied in-processing bias mitigation'
    ],
    fairnessImprovements: {
      selectionRate: {
        beforeMitigation: {
          urbanCandidate: '78%',
          ruralCandidate: '52%',
          difference: '26%'
        },
        afterMitigation: {
          urbanCandidate: '70%',
          ruralCandidate: '64%',
          difference: '6%'
        }
      },
      datasetRebalance: 'Applied weighting to underrepresented demographics',
      featuresRemoved: ['Zip code', 'School names', 'Geographic indicators'],
      modelAdapted: 'Used fairness constraints in objective function'
    }
  },
  'job5': {
    biasMetrics: {
      gender: {
        score: 0.85,
        status: 'Excellent',
        beforeMitigation: 0.67,
        improvement: '+18%'
      },
      age: {
        score: 0.79,
        status: 'Fair',
        beforeMitigation: 0.65,
        improvement: '+14%'
      },
      ethnicity: {
        score: 0.88,
        status: 'Excellent',
        beforeMitigation: 0.72,
        improvement: '+16%'
      }
    },
    algorithmAdjustments: [
      'Applied group fairness constraints',
      'Used bias-aware representation learning',
      'Implemented multi-objective optimization',
      'Applied causal reasoning for bias detection'
    ],
    fairnessImprovements: {
      selectionRate: {
        beforeMitigation: {
          maleEngineer: '75%',
          femaleEngineer: '45%',
          difference: '30%'
        },
        afterMitigation: {
          maleEngineer: '68%',
          femaleEngineer: '61%',
          difference: '7%'
        }
      },
      datasetRebalance: 'Used importance sampling techniques for fair representation',
      featuresRemoved: ['Profile picture', 'Name', 'Gender-specific activities', 'Personal interests'],
      modelAdapted: 'Used AIF360 toolkit with reweighing'
    }
  }
};

export default biasAnalysisData; 