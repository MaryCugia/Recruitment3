import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { pool } from '../config/db.js';

const router = express.Router();

// Get AI insights for a specific job
router.get('/insights/:jobId', authenticateToken, async (req, res) => {
    try {
        const { jobId } = req.params;
        const userId = req.user.id;

        // Get job requirements
        const [jobRows] = await pool.query(
            'SELECT * FROM jobs WHERE id = ?',
            [jobId]
        );

        if (jobRows.length === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const job = jobRows[0];

        // Get candidate profile
        const [candidateRows] = await pool.query(
            'SELECT * FROM candidates WHERE id = ?',
            [userId]
        );

        if (candidateRows.length === 0) {
            return res.status(404).json({ message: 'Candidate profile not found' });
        }

        const candidate = candidateRows[0];

        // Calculate match score and insights
        const insights = {
            jobMatchScore: calculateMatchScore(job, candidate),
            skillMatch: analyzeSkills(job, candidate),
            experienceMatch: analyzeExperience(job, candidate),
            culturalFit: analyzeCulturalFit(job, candidate),
            recommendations: generateRecommendations(job, candidate)
        };

        res.json(insights);
    } catch (error) {
        console.error('Error getting AI insights:', error);
        res.status(500).json({ message: 'Error getting AI insights' });
    }
});

// Helper functions for analysis
function calculateMatchScore(job, candidate) {
    // This is a simplified example - in a real application, you'd use more sophisticated algorithms
    let score = 0;
    const totalFactors = 4; // skills, experience, education, cultural fit

    // Skill match (30% weight)
    const skillMatch = analyzeSkills(job, candidate);
    score += (skillMatch.matched.length / skillMatch.required.length) * 30;

    // Experience match (30% weight)
    const expMatch = analyzeExperience(job, candidate);
    score += (expMatch.match === 'Complete' ? 30 : expMatch.match === 'Partial' ? 15 : 0);

    // Education match (20% weight)
    const eduMatch = analyzeEducation(job, candidate);
    score += eduMatch * 20;

    // Cultural fit (20% weight)
    const culturalFit = analyzeCulturalFit(job, candidate);
    score += (culturalFit.score / 100) * 20;

    return Math.round(score);
}

function analyzeSkills(job, candidate) {
    const requiredSkills = job.requirements.split(',').map(skill => skill.trim());
    const candidateSkills = candidate.skills.split(',').map(skill => skill.trim());

    return {
        required: requiredSkills,
        matched: requiredSkills.filter(skill => candidateSkills.includes(skill)),
        missing: requiredSkills.filter(skill => !candidateSkills.includes(skill))
    };
}

function analyzeExperience(job, candidate) {
    const requiredExp = parseInt(job.experience_required);
    const candidateExp = parseInt(candidate.years_experience);

    return {
        required: `${requiredExp}+ years`,
        candidate: `${candidateExp} years`,
        match: candidateExp >= requiredExp ? 'Complete' : 
               candidateExp >= requiredExp * 0.7 ? 'Partial' : 'Incomplete'
    };
}

function analyzeEducation(job, candidate) {
    // Simple education level comparison
    const educationLevels = {
        'High School': 1,
        'Associate': 2,
        'Bachelor': 3,
        'Master': 4,
        'PhD': 5
    };

    const requiredLevel = educationLevels[job.education_required] || 0;
    const candidateLevel = educationLevels[candidate.education_level] || 0;

    return candidateLevel >= requiredLevel ? 1 : 0.5;
}

function analyzeCulturalFit(job, candidate) {
    // This would be more sophisticated in a real application
    return {
        score: 85, // Example score
        factors: [
            'Strong alignment with company values',
            'Good communication skills',
            'Team-oriented approach'
        ]
    };
}

function generateRecommendations(job, candidate) {
    const recommendations = [];
    const skillMatch = analyzeSkills(job, candidate);
    const expMatch = analyzeExperience(job, candidate);

    if (skillMatch.missing.length > 0) {
        recommendations.push(`Consider developing skills in: ${skillMatch.missing.join(', ')}`);
    }

    if (expMatch.match === 'Partial') {
        recommendations.push('Gain more experience in the required field');
    }

    if (expMatch.match === 'Incomplete') {
        recommendations.push('Consider applying for junior positions first');
    }

    return recommendations;
}

export default router; 