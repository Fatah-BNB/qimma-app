import React from "react"
import { useEffect, useState, useRef } from "react";
import NavBar from "../../user/navbar/navbar"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios"
import { fetchUserData } from "../../../slices/user-slice";
import defaultAvatar from "../../../icons/default_avatar.png"
import toast, { Toaster } from 'react-hot-toast';
import ChangePassword from "./changePassword";
import Chart from "react-apexcharts";
import ApexCharts from 'apexcharts';
import Footer from "../footer";
import SkillChart from "./skillChart";

export default function Profile1() {
    const [courses, setCourses] = useState([])
    const [selfAssessmentsPrediction, setSelfAssessmentsPrediction] = useState('');
    const [timeManagmentPrediction, setTimeManagmentPrediction] = useState('');
    const [helpSeekingBehaviorPrediction, setHelpSeekingBehaviorPrediction] = useState('');
    const [interactionPrediction, setInteractionPrediction] = useState('');
    const [assessmentPerformancePrediction, setAssessmentPerformancePrediction] = useState('');
    const [progressAndCompletionPrediction, setProgressAndCompletionPrediction] = useState('');
    const [studyPatternsPrediction, setStudyPatternsPrediction] = useState('');
    const [overallPerformancePrediction, setOverallPerformancePrediction] = useState('');


    const getStudentCourses = () => {
        Axios.get("http://localhost:5000/student/enrolled-courses").then(response => {
            console.log(response.data.succMsg)
            console.log(response.data.results)
            setCourses(response.data.results)
        }).catch(error => {
            console.log(error.response.data.errMsg)
        })
    }

    const predictSelfAssessments = async () => {
        const inputData = {
            confidence_level: 1,
            self_assessments_number: 20,
            self_assessments_scores: 15,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_self_assessments', inputData);
            setSelfAssessmentsPrediction(response.data.self_assessments * 100);
            console.log("SELF ASSESSMENTS === ", response.data.self_assessments)
        } catch (error) {
            console.error('Error occurred during prediction [self assessments]:', error);
        }
    }
    const predictTimeManagement = async () => {
        const inputData = {
            deadlines_met: 12,
            submitted_assignments: 13,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_time_management', inputData);
            setTimeManagmentPrediction(response.data.time_management * 100);
            console.log("TIME MANAGEMENT === ", response.data.time_management)
        } catch (error) {
            console.error('Error occurred during prediction [time management]:', error);
        }
    }
    const predictHelpSeekingBehavior = async () => {
        const inputData = {
            seeking_instructor_assistance: 24,
            utilizing_support_features: 12,
            help_requtests: 10,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_help_seeking_behavior', inputData);
            setHelpSeekingBehaviorPrediction(response.data.help_seeking_behavior * 100);
            console.log("HELP SEEKING BEHAVIOR === ", response.data.help_seeking_behavior)
        } catch (error) {
            console.error('Error occurred during prediction [help seeking behavior]:', error);
        }
    }
    const predictInteraction = async () => {
        const inputData = {
            number_of_logins: 54,
            'avg_session_duration(min)': 32,
            access_course_freq: 26,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_interaction', inputData);
            setInteractionPrediction(response.data.interaction * 100);
            console.log("INTERACTION === ", response.data.interaction)
        } catch (error) {
            console.error('Error occurred during prediction [interaction]:', error);
        }
    }
    const predictAssessmentPerfomance = async () => {
        const inputData = {
            number_of_quizzes: 31,
            avg_score: 10,
            courses_completion_avg_rate: 0.42,
            'avg_quizzes_completion_time(min)': 16,
            accuracy_level: 0.23,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_assessment_performance', inputData);
            setAssessmentPerformancePrediction(response.data.assessment_performance * 100);
            console.log("ASSESSMENT PERFORMANCE === ", response.data.assessment_performance)
        } catch (error) {
            console.error('Error occurred during prediction [assessment performance]:', error);
        }
    }
    const predictProgressAndCompletion = async () => {
        const inputData = {
            number_of_courses: 20,
            completed_courses_percentage: 0.26,
            'avg_course_completion_time(hour)': 2.2,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_progress_and_completion', inputData);
            setProgressAndCompletionPrediction(response.data.progress_and_completion * 100);
            console.log("PROGRESS AND COMPLETION === ", response.data.progress_and_completion)
        } catch (error) {
            console.error('Error occurred during prediction [progress and completion]:', error);
        }
    }
    const predictStudyPatterns = async () => {
        const inputData = {
            most_active_time: 23,
            'avg_study_duration(min)': 25,
        };

        try {
            const response = await Axios.post('http://localhost:5001/predict_study_patterns', inputData);
            setStudyPatternsPrediction(response.data.study_patterns * 100);
            console.log("STUDY PATTERNS === ", response.data.study_patterns)
        } catch (error) {
            console.error('Error occurred during prediction [study patterns]:', error);
        }
    }
    const predictOverallPerformance = async () => {
        const inputData = {
            interaction: interactionPrediction,
            assessment_performance: assessmentPerformancePrediction,
            progress_and_completion: progressAndCompletionPrediction,
            study_patterns: studyPatternsPrediction,
            self_assessments: selfAssessmentsPrediction,
            time_management: timeManagmentPrediction,
            help_seeking_behavior: helpSeekingBehaviorPrediction,
        };
        console.log("INPUT DATA ||||| ", inputData)
        try {
            const response = await Axios.post('http://localhost:5001/predict_overall_performance', inputData);
            setOverallPerformancePrediction(response.data.overall_performance);
            switch (response.data.overall_performance) {
                case 0: console.log("OVERALL PERFORMANCE >>>> BAD")
                    break
                case 1: console.log("OVERALL PERFORMANCE >>>> AVERAGE")
                    break
                case 2: console.log("OVERALL PERFORMANCE >>>> GOOD")
                    break
                case 3: console.log("OVERALL PERFORMANCE >>>> GREATE")
                    break
                default: break
            }
            console.log("OVERALL PERFORMANCE >>>> ", response.data.overall_performance)
        } catch (error) {
            console.error('Error occurred during prediction [overll performance]:', error);
        }
    }

    useEffect(() => {
        getStudentCourses()
    }, [])

    useEffect(() => {
        if (courses) {
            predictSelfAssessments()
            predictTimeManagement()
            predictHelpSeekingBehavior()
            predictInteraction()
            predictAssessmentPerfomance()
            predictProgressAndCompletion()
            predictStudyPatterns()
            predictOverallPerformance()
        } else {
            console.log("No courses")
        }
    }, [])



    // const skillsValues = [Math.round(interactionPrediction), Math.round(timeManagmentPrediction), Math.round(assessmentPerformancePrediction), Math.round(selfAssessmentsPrediction), Math.round(progressAndCompletionPrediction), Math.round(studyPatternsPrediction), Math.round(helpSeekingBehaviorPrediction)]
    // const skillsNames = ["Interaction", "Time management", "Assessment performance", "Self assessments", "Progress and completion", "Study patterns", "Help seeking behavior"]
    // const skillsColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4']
    // const OverallValue = overallPerformancePrediction
    const skillsValues = [Math.round(interactionPrediction), Math.round(timeManagmentPrediction), Math.round(assessmentPerformancePrediction), Math.round(selfAssessmentsPrediction), Math.round(progressAndCompletionPrediction), Math.round(studyPatternsPrediction), Math.round(helpSeekingBehaviorPrediction)]
    const skillsNames = ["التفــــاعل", "إدارة الوقـــت", "أداء التــقيــــم", "التــقييــم الــذاتـي", "التــقدم والإنـــجـاز", "النمــط الدراســـي", "سلــوك طلـب المـســاعدة"]
    const skillsColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4']
    const OverallValue = overallPerformancePrediction


    return (
        <div>
            <NavBar />
            
            {courses.length > 0 ?
                <div>
                    <div className="w-full bg-primary  p-8">
                        
                        <p className="text-3xl text-center font-bold text-white">الأداء العـــــام</p>
                        {OverallValue == 0 && <h1 className="text-7xl font-extrabold text-center p-8"><span className="bg-gradient-to-r from-white to-red-300 text-transparent bg-clip-text">
                            ســــيء
                        </span></h1>}
                        {OverallValue == 1 && <h1 className="text-7xl font-extrabold text-center p-8"><span className="bg-gradient-to-r from-white to-orange-300 text-transparent bg-clip-text">
                            مــتوســـــط
                        </span></h1>}
                        {OverallValue == 2 && <h1 className="text-7xl font-extrabold text-center p-8"><span className="bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text">
                            جـــيـــد
                        </span></h1>}
                        {OverallValue == 3 && <h1 className="text-7xl font-extrabold text-center p-8"><span className="bg-gradient-to-r from-white to-secondary text-transparent bg-clip-text">
                            مـمــــتــاز
                        </span></h1>}
                    </div>
                    <div className="flex flex-wrap justify-around gap-12 p-12">
                        <SkillChart title={skillsNames[0]} value={[skillsValues[0]]} color={skillsColors[0]}/>
                        <SkillChart title={skillsNames[1]} value={[skillsValues[1]]} color={skillsColors[1]}/>
                        <SkillChart title={skillsNames[2]} value={[skillsValues[2]]} color={skillsColors[2]}/>
                        <SkillChart title={skillsNames[3]} value={[skillsValues[3]]} color={skillsColors[3]}/>
                        <SkillChart title={skillsNames[4]} value={[skillsValues[4]]} color={skillsColors[4]}/>
                        <SkillChart title={skillsNames[5]} value={[skillsValues[5]]} color={skillsColors[5]}/>
                        <SkillChart title={skillsNames[6]} value={[skillsValues[6]]} color={skillsColors[6]}/>

                    </div>
                </div> : <div className="w-full bg-primary p-8"><p className="text-3xl text-center font-bold text-white">يجب أن تكون مسجلا في دورة واحدة على الأقل</p></div>
            }
            <Footer />
        </div >
    )
}