import { CiLocationOn } from "react-icons/ci";
import { FaCrown, FaPhone, FaUserCircle } from "react-icons/fa";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

import { FiEdit2 } from "react-icons/fi";

import { MdDeleteOutline, MdOutlineEdit, MdOutlineRadioButtonChecked } from "react-icons/md";
import { LuClipboardCopy } from "react-icons/lu";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Spinner } from "../components/loader";
import { GiTireIronCross } from "react-icons/gi";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { LucideAlertCircle, X } from "lucide-react";
export default function UpdateUser(){

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[city,setCity] = useState('');
    const[experience,setExp] = useState('');
    const[phone,setPhone] = useState('');
    const[updated,setUpdated] = useState('');
    const [verified,setVerified] = useState('not-verified');
    const [availability,setAvailable] = useState('')
    const [resumeUrl,setResumeUrl] = useState('')
    const [profileUrl,setProfileUrl] = useState('')
    async function UserDetails(){
        try{
            const Details = await axios({
                url:`https://jobportalbackend-whpt.onrender.com/user/BasicDetails`,
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
            })
            console.log(Details.data)

            if(Details.data && Details.data.user){
               setName(Details.data.user.name);
               setEmail(Details.data.user.email);
               setVerified(Details.data.user.emailVerify)
               setPhone(Details.data.user.phone);
               setExp(Details.data.user.experience);
               setCity(Details.data.user.location);
               setUpdated(formatDate(Details.data.user.updatedAt))
               setAvailable(Details.data.user.availability)
               setResumeUrl(Details.data.user.resumeUrl)
               setProfileUrl(Details.data.user.profilePic)
               localStorage.setItem('profilePic',Details.data.user.profilePic)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
         UserDetails()
    },[])


    // Pop ups
    const[showDisability,setShowDisability] = useState(true)
    const[DisabilityPopup,setDisabilityPopup] = useState(false);
    const[personalPopup,setPersonalPopup] = useState(false);
    const[careerPopup,setCareerPopup] = useState(false);
    const [key_skillsPopup,setKeySkillsPopup] = useState(false)
    const [eduPopup,setEdupopup] = useState(false)
    const [editUser,setEditUser] = useState(false)
    

    
   

    //  Getting disability
     const [disability,setDisability] = useState('');
     const [military,setMilitary] = useState('');
     const [careerBreak,setBreak] = useState('');
     const [keySkills,setKeySkills] = useState<String []>([]);
     const [preObj,setRowId] = useState({})
     const [personalObj,setPersonalObj] = useState({
            gender:'',
            maritalStatus:'',
            dateofBirth:'',
            category:'',
            moreInfo:[],
            address:"",
            language:[] 
            
        })

        interface EducationType{
            education:''
            marks:''
            passout:''
            startingCourse:''
            endingCourse:''
            course:''
            courseType:''
            gradingSystem:''
            medium:''
            board:''
        }
     const [educationSet,setEducationSet] = useState<EducationType[]>([])



        async function GetDiversity(){
            try{
                const Got = await axios({
                    url:`https://jobportalbackend-whpt.onrender.com/user/getDisability?email=${localStorage.getItem('email')}`,
                    method:'GET',
                    
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                    }
                })

                if(Got.data){
                    setDisability(Got.data.disability);
                    setMilitary(Got.data.militaryExp);
                    setBreak(Got.data.careerBreak)
                }


            }
            catch(err){
                console.log(err);
            }
        
        }

        async function GettingAlreadySkills(){
            try{
                const Data = await axios({
                    url:'https://jobportalbackend-whpt.onrender.com/user/getKeySkills',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    method:'GET'
                })

                if(Data.data && Data.data.ok){
                    setKeySkills(Data.data.skills);
                }
            }
            catch(err){
                console.log(err)
                alert(err)
            }
        }

       


        async function Getting_PersonalDetails(){
            try{
                const FinalData = await axios({
                    url:'https://jobportalbackend-whpt.onrender.com/user/getPersonalDetails',
                    method:'GET',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(FinalData.data && FinalData.data.data.Personal){
                    setPersonalObj({
                        gender:FinalData.data.data.Personal.gender,
                        category:FinalData.data.data.Personal.category,
                        maritalStatus:FinalData.data.data.Personal.maritalStatus,
                        moreInfo:FinalData.data.data.Personal.moreInfo,
                        dateofBirth:FinalData.data.data.Personal.dateofBirth,
                        address:FinalData.data.data.Personal.permanentAddress,
                        language:FinalData.data.data.Language
                    })
                }


            }
            catch(err){
                console.log(err)
            }
        }

        async function Getting_Educational(){
            try{
                 const Getting = await axios({
                    url:'https://jobportalbackend-whpt.onrender.com/user/getEducation',
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    },
                    method:'GET'
                 })

                 if(Getting.data && Getting.data.ok){
                    setEducationSet(Getting.data.education)
                 }
            }
            catch(err){
                console.log(err)
            }
        }


        

    useEffect(()=>{
           GetDiversity();
           GettingAlreadySkills();
           Getting_PersonalDetails();
           Getting_Educational();
    },[])


    function Education_Exist_OrNot(education:any){
       if(educationSet.length>0){
        return educationSet.some(each => each.education===education)
       }
    }

    function EducationType(education:any){
        if(educationSet.length>0){
            if(education==='10th' || education==='12th'){
                return 'school'
            }
            else return 'higherEducation'
        }
    }
    return (
        <div className="font-aman bg-gray-50 p-14">
               <ProfileCard reloadDetails={UserDetails} profilePic={profileUrl} availability={availability} setEditUser={setEditUser} name={name} email={email} phone={phone} updated={updated} city={city} exp={experience} verify={verified}/>


            {/* lower part */}

            <div className="max-w-6xl gap-6 mx-auto flex mt-10">
                     <QuickLinks/>

                     <div className="w-[70%] flex-col gap-4 flex">
                      {showDisability &&  <Disability_Banner setShowDisability={setShowDisability}/>}
                       

                        <ResumeUpdate reloadDetails={UserDetails} existingResumeUrl={resumeUrl}/>

                         {/* Key skills */}

                         <div id="KeySkills" className="p-6 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-lg">
    {/* Header */}
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100/80">
        <div className="flex items-center gap-3">
            <div className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Key skills
            </div>
            <div 
                onClick={() => setKeySkillsPopup(true)}
                className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-cyan-50 cursor-pointer transition-all duration-300 hover:shadow-sm border border-gray-200/60 hover:border-blue-200/60"
            >
                <MdOutlineEdit className="text-gray-600 hover:text-blue-600 transition-colors" />
            </div>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            <div className="text-xs text-gray-500">{keySkills.length} skills</div>
        </div>
    </div>

    {/* Empty State */}
    {!keySkills.length && (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl border border-blue-100/50 mb-4">
            <div className="p-2 rounded-lg bg-white">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                </div>
            </div>
            <div className="text-gray-600 text-sm leading-relaxed">
                Recruiter prefer specific skills before hiring.
            </div>
        </div>
    )}

    {/* Skills Display */}
    {keySkills.length > 0 && (
        <div className="flex flex-wrap gap-3">
            {keySkills.map((each: any, index: number) => (
                <div 
                    key={index}
                    className="group relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative px-5 py-2.5 bg-gradient-to-br from-white to-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-300/80 hover:border-blue-300/80 transition-all duration-300 hover:shadow-md group-hover:-translate-y-0.5">
                        {each}
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </span>
                </div>
            ))}
        </div>
    )}

    {/* Divider */}
    {keySkills.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100/60">
            <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"></div>
                Skills help you get 3x more interview calls
            </div>
        </div>
    )}
</div>

                         {/* Employement */}

                        <ReUsableCommonDiv firstSpan={'Employment'} lastSpan={'Add employment'} MainContent={'Your employment details will help recruiters understand your experience'} gap={'3'}/>

                         {/* Education */}
                         <div id="Education" className="flex flex-col bg-white gap-4  p-4 rounded-2xl">
                            <div className="flex justify-between">
                                <span className="font-medium ">Education <span   onClick={Getting_Educational}className="cursor-pointer hover:text-green-500 hover:font-medium animate-pulse ">(Reload Details)</span></span>
                                <span onClick={()=> {
                                    setRowId({})
                                    setEdupopup(true)
                                    }} className="text-blue-500 font-medium cursor-pointer">Add education</span>
                            </div>

                            <p className="text-slate-500 ">Your qualifications help employers know your educational background</p>

                             
                             <div className="flex flex-col gap-4 items-start">
                                {
                                  educationSet.map((each:any)=>{
                                    return <div>
                                        {EducationType(each.education)==='school' && <div className="flex flex-col">
                                              <span className="font-medium  flex gap-3 items-center">Class {each.education} <FiEdit2 onClick={()=> {
                                                setRowId({education:each.education,rowId:each.id})
                                                setEdupopup(true)
                                                }}  className="text-slate-500 cursor-pointer"/></span>
                                              <span className="font-medium">{each.medium}</span>
                                              <span className="text-slate-500">{each.passout}</span>
                                         </div>
                                        }
                                        {EducationType(each.education)==='higherEducation' && <div className="flex flex-col">
                                              <span className="font-medium flex gap-3 items-center">{each.education} {each.course}  <FiEdit2 onClick={()=> {
                                                setRowId({education:each.education,rowId:each.id})
                                                setEdupopup(true)
                                                }} className="text-slate-500 cursor-pointer"/></span>
                                              <span className="font-medium">{each.university}</span>
                                              <span className="text-slate-500">{each.startingCourse}-{each.endingCourse} | {each.courseType}</span>

                                         </div>
                                        }
                                    </div>
                                  })
                                }
                             </div>
                          

                            <div className="flex flex-col gap-4 items-start">

                                {!Education_Exist_OrNot('Doctorate/PhD') && <span className="text-blue-500 font-medium text-md">Add doctorate/PHD</span>}
                                {!Education_Exist_OrNot('Masters/Post-Graduation') && <span className="text-blue-500 font-medium text-md">Add masters/post-graduation</span>}
                                {!Education_Exist_OrNot('Graduation/Diploma') && <span className="text-blue-500 font-medium text-md">Add graduation/diploma</span>}
                                {!Education_Exist_OrNot('12th') &&  <span className="text-blue-500 font-medium text-md">Add class XII</span>}
                                {!Education_Exist_OrNot('10th') && <span className="text-blue-500 font-medium text-md">Add class 10th</span>}
                                
                            </div>
                         </div>

                        {/* IT skills */}
                        <ReUsableCommonDiv ID={'ITSkills'} firstSpan={'IT skills'} lastSpan={'Add Details'} MainContent={'Show your technical expertise by mentioning softwares and skills you know'} gap={'3'}/>

                        <ReUsableCommonDiv ID={'Projects'} firstSpan={'Projects'} lastSpan={'Add Projects'} MainContent={'Stand out to employers by adding details about projects that you have done so far'} gap={'3'}/>
 
                        <ReUsableCommonDiv ID={'Summary'} firstSpan={'Profile Summary'} lastSpan={'Add profile summary'} MainContent={'Highlight your key career achievements to help employers know your potential'} gap={'3'}/>




                        {/* Career profile */}
                         <div id="CareerProfile" className="flex  gap-10 mx-auto p-6 bg-white rounded-2xl shadow-lg">
       
                <div className="w-full">
                    {/* Main Heading */}
                    <div className="flex items-center gap-4 w-full mb-5">
            <h1 className="text-lg  font-medium text-gray-800">Career profile</h1>
                <MdOutlineEdit onClick={()=> setCareerPopup(true)} className="text-slate-500"/>
                    </div>
                
                
                {/* Current Industry */}
                <div className="mb-4">
                    <span className="text-gray-500 ">Current industry</span>
                    <p className="text-gray-800">Miscellaneous</p>
                </div>

                {/* Desired Job Type */}
                <div className="mb-4">
                    <span className="text-gray-500">Desired job type</span>
                    <p className="text-blue-500 font-medium">Add desired job type</p>
                </div>

                {/* Preferred Shift */}
                <div className="mb-4">
                    <span className="text-gray-500">Preferred shift</span>
                    <p className="text-blue-500 font-medium">Add preferred shift</p>
                </div>

                {/* Expected Salary */}
                <div className="mb-6">
                    <span className="text-gray-600 font-medium">Expected salary</span>
                    <p className="font-medium text-slate-600">¥1,20,000</p>
                </div>
                </div>

                
                <div className="flex justify-center pt-10 flex-col">
                    {/* Department */}
                <div className="mb-4">
                    <h3 className="  text-gray-500 mb-2">Department</h3>
                    <p className="text-blue-500 font-medium">Add department</p>
                </div>

                {/* Desired Employment Type */}
                <div className="mb-4">
                    <span className="text-gray-500">Desired employment type</span>
                    <p className="text-blue-500 font-medium">Add desired employment type</p>
                </div>

                {/* Preferred Work Location */}
                <div className="mb-4">
                    <span className="text-gray-500">Preferred work location</span>
                    <p className="text-gray-800 font-medium">
                    Guna, Kolkata, Ahmedabad, Noida, Pune, Mumbai, Bangalore/Bengaluru, Delhi / NCR
                    </p>
                </div>
                </div>

                
                         </div>

                         {/* Personal details */}
                         <div id="PersonalDetails" className="p-6 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-xl">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100/60">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400"></div>
            <div className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Personal details
            </div>
        </div>
        <button
            onClick={() => setPersonalPopup(true)}
            className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 hover:shadow-sm border border-gray-200/60 hover:border-indigo-200/60 cursor-pointer"
        >
            <MdOutlineEdit className="text-gray-600 hover:text-indigo-600 transition-colors" />
        </button>
    </div>

    {/* Description */}
    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl border border-blue-100/50">
        <p className="text-gray-600 text-sm leading-relaxed">
            This information is important for employers to know you better
        </p>
    </div>

    {/* Personal Info Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Personal */}
        <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
            <div className="text-sm font-medium text-gray-500 mb-2">Personal</div>
            <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-300/60">
                    {personalObj.gender ? personalObj.gender : 'Gender'}
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-300/60">
                    {personalObj.maritalStatus ? personalObj.maritalStatus : 'Marital Status'}
                </div>
                {personalObj.moreInfo?.map((info: string, index: number) => (
                    <div key={index} className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-300/60">
                        {info}
                    </div>
                ))}
                {(!personalObj.moreInfo || personalObj.moreInfo.length === 0) && (
                    <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-full text-sm font-medium border border-blue-200/60">
                        Add more info
                    </div>
                )}
            </div>
        </div>

        {/* Date of Birth */}
        <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
            <div className="text-sm font-medium text-gray-500 mb-2">Date of Birth</div>
            <div className={`px-4 py-2.5 rounded-lg border ${personalObj.dateofBirth ? 'border-gray-300/60 bg-white' : 'border-dashed border-blue-300/60 bg-gradient-to-r from-blue-50/50 to-cyan-50/50'}`}>
                <span className={`font-medium ${personalObj.dateofBirth ? 'text-gray-800' : 'text-blue-600'}`}>
                    {personalObj.dateofBirth ? formatDate(personalObj.dateofBirth) : 'Add date of birth'}
                </span>
            </div>
        </div>

        {/* Category */}
        <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
            <div className="text-sm font-medium text-gray-500 mb-2">Category</div>
            <div className={`px-4 py-2.5 rounded-lg border ${personalObj.category ? 'border-gray-300/60 bg-white' : 'border-dashed border-green-300/60 bg-gradient-to-r from-green-50/50 to-emerald-50/50'}`}>
                <span className={`font-medium ${personalObj.category ? 'text-gray-800' : 'text-green-600'}`}>
                    {personalObj.category ? personalObj.category : 'Add category'}
                </span>
            </div>
        </div>

        {/* Work Permit */}
        <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
            <div className="text-sm font-medium text-gray-500 mb-2">Work permit</div>
            <div className="px-4 py-2.5 rounded-lg border border-dashed border-orange-300/60 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                <span className="font-medium text-orange-600">Add work permit</span>
            </div>
        </div>

        {/* Address */}
        <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
            <div className="text-sm font-medium text-gray-500 mb-2">Address</div>
            <div className={`px-4 py-2.5 rounded-lg border ${personalObj.address ? 'border-gray-300/60 bg-white' : 'border-dashed border-purple-300/60 bg-gradient-to-r from-purple-50/50 to-pink-50/50'}`}>
                <span className={`font-medium ${personalObj.address ? 'text-gray-800' : 'text-purple-600'}`}>
                    {personalObj.address ? personalObj.address : 'Add address'}
                </span>
            </div>
        </div>

        {/* Languages (if empty) */}
        {!personalObj.language.length && (
            <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
                <div className="text-sm font-medium text-gray-500 mb-2">Languages</div>
                <div className="px-4 py-2.5 rounded-lg border border-dashed border-red-300/60 bg-gradient-to-r from-red-50/50 to-pink-50/50">
                    <span className="font-medium text-red-600">Add languages</span>
                </div>
            </div>
        )}
    </div>

    {/* Languages Table Section */}
    {personalObj.language.length > 0 && (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 flex items-center justify-center">
                            <div className="text-white text-xs font-bold">L</div>
                        </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">Languages</div>
                </div>
           
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200/60 shadow-sm">
                <table className="w-full border-collapse bg-white/80 backdrop-blur-sm">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100/80 border-b border-gray-200/60">
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Language</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Proficiency</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Read</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Write</th>
                            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Speak</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personalObj.language.map((eachObj: any, index: number) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100/60 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-300 group"
                            >
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                                                <span className="text-sm font-semibold text-indigo-600">
                                                    {eachObj.language.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-medium text-gray-800">{eachObj.language}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full text-sm font-medium text-gray-700 border border-gray-200/60">
                                        {eachObj.proficiency}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className={`p-2 rounded-lg ${eachObj.canRead ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-pink-50'}`}>
                                        {eachObj.canRead ? (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
                                                <span className="text-xs font-medium text-green-700">Yes</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-400"></div>
                                                <span className="text-xs font-medium text-red-700">No</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className={`p-2 rounded-lg ${eachObj.canWrite ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-pink-50'}`}>
                                        {eachObj.canWrite ? (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
                                                <span className="text-xs font-medium text-green-700">Yes</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-400"></div>
                                                <span className="text-xs font-medium text-red-700">No</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className={`p-2 rounded-lg ${eachObj.canSpeak ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-pink-50'}`}>
                                        {eachObj.canSpeak ? (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
                                                <span className="text-xs font-medium text-green-700">Yes</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-pink-400"></div>
                                                <span className="text-xs font-medium text-red-700">No</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Language Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-xl border border-indigo-100/50">
                    <div className="text-2xl font-bold text-indigo-600">{personalObj.language.length}</div>
                    <div className="text-sm text-gray-600 mt-1">Total Languages</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-xl border border-green-100/50">
                    <div className="text-2xl font-bold text-green-600">
                        {personalObj.language.filter((lang: any) => lang.canSpeak).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Can Speak</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-xl border border-blue-100/50">
                    <div className="text-2xl font-bold text-blue-600">
                        {personalObj.language.filter((lang: any) => lang.canRead && lang.canWrite).length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Fluent</div>
                </div>
            </div>
        </div>
    )}
</div>



                         {/* Diversity inclusion */}
                         <div className="p-6 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-lg relative overflow-hidden">
    
    {/* New Badge */}
    <div className="absolute top-0 right-0 pr-4">
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-bl-lg shadow-sm">
            New
        </span>
    </div>

    {/* Header */}
    <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-400"></div>
            <div className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Diversity & inclusion
            </div>
        </div>
        <button
            onClick={() => setDisabilityPopup(true)}
            className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:shadow-sm border border-gray-200/60 hover:border-purple-200/60 cursor-pointer"
        >
            <MdOutlineEdit className="text-gray-600 hover:text-purple-600 transition-colors" />
        </button>
    </div>

    {/* Description */}
    <div className="mb-6 p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl border border-purple-100/50">
        <p className="text-gray-600 text-sm leading-relaxed">
            Share details to attract recruiters who value people from different backgrounds
        </p>
    </div>

    {/* Content */}
    <div className="space-y-6">
        {/* Disability Status */}
        <div>
            {disability ? (
                <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Disability status</span>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-lg">
                        {disability === 'true' ? "I have a disability" : "Do not have disability"}
                    </span>
                </div>
            ) : (
                <button
                    onClick={() => setDisabilityPopup(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-blue-300/60 bg-gradient-to-r from-blue-50/30 to-cyan-50/30 hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300 hover:shadow-sm cursor-pointer text-left group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                                </div>
                            </div>
                            <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                                Add disability status
                            </span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white group-hover:bg-blue-50 transition-colors">
                            <div className="w-4 h-4 rounded-full border-2 border-dashed border-blue-400"></div>
                        </div>
                    </div>
                </button>
            )}
        </div>

        {/* Military Experience */}
        <div>
            {military ? (
                <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Military Experience</span>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{military}</span>
                </div>
            ) : (
                <button
                    onClick={() => setDisabilityPopup(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-indigo-300/60 bg-gradient-to-r from-indigo-50/30 to-purple-50/30 hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300 hover:shadow-sm cursor-pointer text-left group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-400"></div>
                                </div>
                            </div>
                            <span className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                                Add military experience
                            </span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white group-hover:bg-indigo-50 transition-colors">
                            <div className="w-4 h-4 rounded-full border-2 border-dashed border-indigo-400"></div>
                        </div>
                    </div>
                </button>
            )}
        </div>

        {/* Career Break */}
        <div>
            {careerBreak ? (
                <div className="p-4 bg-gradient-to-br from-white to-gray-50/50 rounded-xl border border-gray-200/60">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500">Career Break</span>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></div>
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{careerBreak}</span>
                </div>
            ) : (
                <button
                    onClick={() => setDisabilityPopup(true)}
                    className="w-full p-4 rounded-xl border-2 border-dashed border-green-300/60 bg-gradient-to-r from-green-50/30 to-emerald-50/30 hover:from-green-50/50 hover:to-emerald-50/50 transition-all duration-300 hover:shadow-sm cursor-pointer text-left group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
                                </div>
                            </div>
                            <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
                                Add career break
                            </span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-white group-hover:bg-green-50 transition-colors">
                            <div className="w-4 h-4 rounded-full border-2 border-dashed border-green-400"></div>
                        </div>
                    </div>
                </button>
            )}
        </div>
    </div>

    {/* Stats Summary */}
    {(disability || military || careerBreak) && (
        <div className="mt-6 pt-4 border-t border-gray-100/60">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">Profile completeness</div>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
                            style={{ 
                                width: `${((disability ? 1 : 0) + (military ? 1 : 0) + (careerBreak ? 1 : 0)) / 3 * 100}%` 
                            }}
                        ></div>
                    </div>
                </div>
                <div className="text-xs text-gray-500">
                    {((disability ? 1 : 0) + (military ? 1 : 0) + (careerBreak ? 1 : 0))}/3 sections complete
                </div>
            </div>
        </div>
    )}
</div>

                         {DisabilityPopup && <Diversity_Inclusion disability={disability} setDisabilityPopup={setDisabilityPopup}/>}

                             {personalPopup && <PersonalDetails onClose={()=> setPersonalPopup(false)}/>}

                             {careerPopup && <CareerProfile onClose={()=> setCareerPopup(false)}/>} 
                             {key_skillsPopup && <KeySkills_Div onClose={()=> setKeySkillsPopup(false)}/>} 
                              {eduPopup && <EducationDiv preObject={preObj || ""}  onClose={()=> setEdupopup(false)}/>}  

                             
                                    
                     </div>
            </div>

          {editUser && <BasicDetailsModal availability={availability} name={name} city={city} phone={phone} exp={experience} email={email} onClose={()=> setEditUser(false)}/>}
        </div>
    )
}


function BasicDetailsModal({onClose,name,city,phone,exp,email,availability}:any) {
  const experiencesList = [
  "0-1",
  "1-2",
  "2-3",
  "3-4",
  "4-5",
  "5-7",
  "7-10",
  "10"
];
  const jobLocations = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Delhi",
  "New Delhi",
  "Gurugram",
  "Noida",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Indore",
  "Lucknow",
  "Bhopal",
  "Nagpur",
  "Chandigarh",
  "Mohali",
  "Zirakpur",
  "Kochi",
  "Trivandrum",
  "Coimbatore",
  "Visakhapatnam",
  "Vadodara",
  "Rajkot",
  "Mysuru",
  "Hubballi",
  "Mangalore",
  "Goa",
  "Patna",
  "Ranchi",
  "Bhubaneswar",
  "Guwahati",
  "Dehradun",
  "Jammu",
  "Udaipur",
  "Kanpur",
  "Varanasi",
  "Prayagraj",
  "Amritsar",
  "Ludhiana",
  "Jalandhar",
  "Faridabad",
  "Ghaziabad",
  "Agra",
  "Meerut",
  "Gorakhpur",
  "Jabalpur",
  "Raipur",
  "Bilaspur",
  "Nashik",
  "Aurangabad",
  "Vijayawada",
  "Tirupati",
  "Warangal",
  "Nellore",
  "Madurai",
  "Salem",
  "Erode",
  "Tirunelveli",
  "Bhavnagar",
  "Gandhinagar",
  "Srinagar",
  "Shimla",
  "Kharagpur",
  "Durgapur",
  "Siliguri",
  "Puducherry",
  "Port Blair",
  "Aizawl",
  "Imphal",
  "Shillong",
  "Kohima",
  "Gangtok",
  "Itanagar",
  "Remote (India)",
  "Work From Home"
];
const topITLocationsIndia = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Gurgaon",
  "Noida",
  "Delhi",
  "Mumbai",
  "Navi Mumbai",
  "Thane",
  "Kolkata",
  "Ahmedabad",
  "Vadodara",
  "Indore",
  "Jaipur",
  "Chandigarh",
  "Mohali",
  "Trivandrum",
  "Kochi",
  "Coimbatore",
  "Madurai",
  "Salem",
  "Vijayawada",
  "Visakhapatnam",
  "Bhubaneswar",
  "Bhopal",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Mysore",
  "Hubli",
  "Belgaum",
  "Mangalore",
  "Udupi",
  "Udaipur",
  "Jodhpur",
  "Ujjain",
  "Gwalior",
  "Raipur",
  "Ranchi",
  "Patna",
  "Lucknow",
  "Kanpur",
  "Prayagraj",
  "Varanasi",
  "Dehradun",
  "Haridwar",
  "Shimla",
  "Una",
  "Solan"
];
const jobRoles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Web Developer",
  "React Developer",
  "Node.js Developer",
  "Java Developer",
  "Python Developer",
  "PHP Developer",
  ".NET Developer",
  "Android Developer",
  "iOS Developer",
  "Flutter Developer",
  "Mobile App Developer",
  "Game Developer",
  "AI Engineer",
  "Machine Learning Engineer",
  "Data Scientist",
  "Data Analyst",
  "Business Intelligence Analyst",
  "DevOps Engineer",
  "Cloud Engineer",
  "AWS Engineer",
  "Azure Engineer",
  "Cyber Security Engineer",
  "Blockchain Developer",
  "QA Engineer",
  "Software Tester",
  "Automation Tester",
  "SDET",
  "Software Architect",
  "Technical Lead",
  "CTO",
  "Product Manager",
  "Associate Product Manager",
  "Project Manager",
  "Program Manager",
  "Scrum Master",
  "Business Analyst",
  "Product Owner",
  "UI Designer",
  "UX Designer",
  "UI/UX Designer",
  "Graphic Designer",
  "Motion Graphics Designer",
  "Video Editor",
  "Animator",
  "3D Artist",
  "VFX Artist",
  "Content Creator",
  "Creative Director",
  "Sales Executive",
  "Sales Manager",
  "Business Development Executive",
  "Business Development Manager",
  "Inside Sales Specialist",
  "Pre-Sales Consultant",
  "Marketing Executive",
  
  "Marketing Manager",
  "Digital Marketing Executive",
  "Digital Marketing Manager",
  "SEO Specialist",
  "SEM Specialist",
  "SMM Specialist",
  "Email Marketing Specialist",
  "Affiliate Marketing Specialist",
  "Growth Hacker",
  "Content Writer",
  "Copywriter",
  "Social Media Manager",
  "Brand Manager",
  "HR Executive",
  "HR Manager",
  "Talent Acquisition Specialist",
  "Recruiter",
  "IT Recruiter",
  "Payroll Specialist",
  "Training and Development Manager",
  "Accountant",
  "Chartered Accountant",
  "Finance Manager",
  "Financial Analyst",
  "Investment Analyst",
  "Audit Executive",
  "Operations Executive",
  "Operations Manager",
  "Customer Support Executive",
  "Customer Success Manager",
  "Technical Support Engineer",
  "MIS Executive",
  "Data Entry Specialist",
  "Office Administrator",
  "Mechanical Engineer",
  "Civil Engineer",
  "Electrical Engineer",
  "Electronics Engineer",
  "Chemical Engineer",
  "Automobile Engineer",
  "Aerospace Engineer",
  "Structural Engineer",
  "Quality Control Engineer",
  "R&D Engineer",
  "Plant Engineer",
  "Teacher",
  "Professor",
  "Lecturer",
  "Trainer",
  "Counselor",
  "Instructional Designer",
  "Logistics Executive",
  "Supply Chain Manager",
  "Warehouse Manager",
  "Procurement Executive",
  "Purchase Manager",
  "Export Import Specialist"
];

const [showLocation,setShowLocation] = useState(false)
const [showMobile,setShowMobile] = useState(false);
const [showEmail,setShowEmail] = useState(false)


const [newObj,setNewObj] = useState({
  name:name,
  location:city,
  phone:phone,
  email:email,
  experience:exp,
  availability:availability
})
const [loading,setLoading] = useState(false)
const [prefLocations,setPrefLocations] = useState<string[]>([]);
const [prefRoles,setPrefRoles] = useState<string[]>([])

function AddLocation(location:string){
    const exist = prefLocations.some(each => each===location)
  if(!exist){
    setPrefLocations(pref => ([...pref,location]))
  }
}
function removeLocation(location:string){
  setPrefLocations(pref => (pref.filter(each => each!==location)))
}
function AddRoles(role:string){
  const exist = prefRoles.some(each => each===role)
  if(!exist){
    setPrefRoles(prev => ([...prev,role]))
  }
}

function RemoveRole(role:string){
  setPrefRoles(prev => (prev.filter(each => each!==role)))
}
async function UpdateUser(){
    setLoading(true)

    try{
       const Updated = await axios({
        url:'https://jobportalbackend-whpt.onrender.com/user/userUpdate',
        data:{
          newObj,
          prefRoles,
          prefLocations
        },
        method:'POST',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
       })

       if(Updated.data && Updated.data.ok){
         alert(Updated.data.msg)
        
         onClose();
       }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
}

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="w-full h-[600px] no-scrollbar overflow-y-scroll max-w-xl bg-white rounded-xl shadow-xl p-6 relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-6">Basic details</h2>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e)=> setNewObj(prev => ({...prev,name:e.target.value}))}
            type="text"
            defaultValue={name}
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       

        {/* Work Experience */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Work Experience</p>
          <p className="text-xs text-gray-500 mb-3">
            We will personalise your Naukri experience based on this
          </p>
          <select
          onChange={(e)=> setNewObj(prev => ({...prev,experience:e.target.value}))}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" name="" id="">
            <option value="" hidden>Select Exp</option>
            
            {
              experiencesList.map(each => {
                return <option value={each}>{each} yrs</option>
              })
            }

          </select>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Current location <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            This helps us match you to relevant jobs
          </p>
          
         <div className="relative w-full">
            <input
              
              value={newObj.location}
              onClick={()=> setShowLocation(prev => !prev)}
              onChange={(e)=> setNewObj(prev => ({...prev,location:e.target.value}))}
              type="text"
              placeholder="Type location"
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className={`absolute ${showLocation ? 'block':'hidden'} h-[200px] overflow-y-scroll p-2 w-full bg-white border rounded-lg mt-1 shadow`}>
              {
                jobLocations.map(each => {
                  return <p onClick={()=>{
                    setNewObj(prev => ({...prev,location:each}));
                    setShowLocation(false)
                  }} className="hover:bg-gray-100 p-1" key={each}>{each}</p>
                })
              }
            </div>
          </div>
        </div>


        {/* preferred locations */}
        <div>
              <label className="block font-medium text-gray-700 mb-1">
                Prefered locations *
              </label>

              <div className='flex mt-2 flex-wrap gap-2'>
                {
                  prefLocations.map(e=>{
                    return <span className='px-3 flex items-center gap-2 py-1 text-white bg-black rounded-2xl' key={e}>{e} <span onClick={()=>{
                      removeLocation(e)
                    }} className='font-semibold cursor-pointer'>X</span></span>
                  })
                }
              </div>
              <select
                onChange={(e)=>{
                     AddLocation(e.target.value)
                }}
              className="w-full mt-3 text-slate-500 p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                <option value="" hidden>Location</option>
                {
                  topITLocationsIndia.map(each => {
                    return <option value={each}>{each}</option>
                  })
                }
              </select>
        </div>

        {/* Job Roles Interests*/}
          <div className="mt-5">
              <label className="block font-medium text-gray-700 mb-1">
                Select Job Roles *
              </label>

              <div className='flex mt-2 flex-wrap gap-2'>
                {
                  prefRoles.map(e=>{
                    return <span className='px-3 flex items-center gap-2 py-1 text-white bg-black rounded-2xl' key={e}>{e} <span onClick={()=>{
                      RemoveRole(e)
                    }} className='font-semibold cursor-pointer'>X</span></span>
                  })
                }
              </div>
              <select
                onChange={(e)=>{
                     AddRoles(e.target.value)
                }}
              className="w-full mt-3 text-slate-500 p-3 border rounded-lg focus:outline-blue-500" name="" id="">
                <option value="" hidden>Roles</option>
                {
                  jobRoles.map(each => {
                    return <option value={each}>{each}</option>
                  })
                }
              </select>
          </div>

        {/* Mobile */}
        <div className="mb-5 mt-5">
          <label className="block text-sm font-medium mb-1">
            Mobile number <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-700">{phone}</p>
          <p onClick={()=> setShowMobile(prev => !prev)} className="text-sm text-blue-600 cursor-pointer">{showMobile ? `Don't Change Number`:`Change mobile number`}</p>

          {
          showMobile && <div>
              <input onChange={(e)=> setNewObj(prev => ({...prev,phone:e.target.value}))} type="text"  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          }
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Email address <span className="text-red-500">*</span>
          </label>
          <p className="text-sm text-gray-700">{email}</p>
          <p onClick={()=> setShowEmail(prev => !prev)} className="text-sm text-blue-600 cursor-pointer">{showEmail ? `Don't Change Email`:`Change Email`}</p> 
          {
            showEmail && <div>
              <input
               onChange={(e)=> setNewObj(prev => ({...prev,email:e.target.value}))}
               type="text" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          }
          
          </div>
          
          


        {/* Availability */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-3">Availability to join</p>
          <div className="flex flex-wrap gap-3">
            {["15 Days or less", "1 Month", "2 Months", "3 Months", "More than 3 Months"].map(
              (item) => (
                <span
                  onClick={()=> setNewObj(prev => ({...prev,availability:item}))}
                  key={item}
                  className={`px-4 py-1.5 border ${newObj.availability===item ? 'bg-gray-100':''} rounded-full text-sm cursor-pointer hover:bg-gray-100`}
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-blue-600">Cancel</button>
          <button
          onClick={UpdateUser}
          className="bg-blue-600 flex justify-center text-white px-6 py-2 rounded-full">
            {loading ? <Spinner/>:'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}




function ReUsableCommonDiv({firstSpan,lastSpan,MainContent,gap,ID}:any){

     const [ResumeAndSummaryShow,setResumeandSummaryShow] = useState(false);
     const [it_skillsPopup,setITSkillsPopup] = useState(false);
     const [employementPopup,setEmployePopup] = useState(false);
     const [projectPopup,setProjectPopup] = useState(false)

    const[content,setContent] = useState('')
    const[It_Skills,setITSkill] = useState([]);
    const [projects,setProjects] = useState([])
    const [loading,setLoading] = useState(false)
    const [rowId,setRowId] = useState('');
    async function Getting_WideRangeOfData(){
        try{
           const GettingData = await axios({
            url:`https://jobportalbackend-whpt.onrender.com/user/${ID}?email=${localStorage.getItem('email')}`,
          
            method:'GET',
            
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
           }) 

           if(GettingData.data && GettingData.data.ok){
            if(ID === 'Summary'){
                setContent(GettingData.data.Data)
            }
           }

        }
        catch(err){
          console.log(err)
        }

    }


    async function Getting_ITSkills(){
         try{
              const Getting = await axios({
                url:'https://jobportalbackend-whpt.onrender.com/user/getItSkills',
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
              })

              if(Getting.data && Getting.data.ok){
                   setITSkill(Getting.data.AllSkills)
              }
         }
         catch(err){
            console.log(err)
         }
    }

    async function Getting_Projects(){
      try{
          const Projects = await axios({
            url:'https://jobportalbackend-whpt.onrender.com/user/getProjects',
            method:'GET',
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })

          if(Projects.data && Projects.data.ok){
                setProjects(Projects.data.projects)
          }
      }
      catch(err){
        console.log(err)
      }
    }

    async function DeleteProject(Rowid:any){
      setLoading(true)
         try{
            const Response = await axios({
              url:`https://jobportalbackend-whpt.onrender.com/user/deleteProject?projectRowId=${Rowid}`,
              method:'DELETE',
              headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
              }
            })

            if(Response.data && Response.data.ok){
              Getting_Projects()
            }
         }
         catch(err){
          console.log(err)  
         }
         finally{
          setLoading(true)
         }
    }

    useEffect(()=>{
           if(ID==='Summary'){
            Getting_WideRangeOfData()
           }
           if(ID==='ITSkills'){
            Getting_ITSkills()
           }
           if(ID==='Projects'){
              Getting_Projects()
           }
           
    },[])
   return (
    <div id={ID} className={`p-4 flex flex-col bg-white shadow-sm gap-${gap} rounded-2xl`}>
         <div className="flex justify-between">
            <span className="font-medium flex items-center gap-2">{firstSpan} {firstSpan==='Profile Summary' ? <MdOutlineEdit onClick={()=> setResumeandSummaryShow(true)} className="text-slate-500 cursor-pointer"/>:''}</span>
            {lastSpan && <span onClick={()=>{
                
            firstSpan==='IT skills' ? setITSkillsPopup(true):''
            firstSpan==='IT skills' ? setRowId(""):''

            firstSpan==='Employment' ? setEmployePopup(true):''

            firstSpan==='Projects' ? setProjectPopup(true):''
            
                
            }} className="font-medium text-blue-500 cursor-pointer">{lastSpan}</span>}
         </div>

         <div>
            <p className="text-slate-500 text-sm">{content ? content:MainContent}</p>
           
         </div>

{/* Showing the pop up */}
         {ResumeAndSummaryShow && <Headline_And_ProfileSummary_Div id={'ProfileSummary'} Headline={'Profile Summary'} Description={'Give recruiters a brief overview of the highlights of your career, key achievements, and career goals to help recruiters know your profile better.'} onClose={()=> setResumeandSummaryShow(false)}/>}


         {it_skillsPopup && <IT_Skills rowId={rowId || ""} onClose={()=> setITSkillsPopup(false)}/>}   
         {employementPopup && <Employement_PopUp onClose={()=> setEmployePopup(false)}/>}
         {projectPopup && <ProjectDiv onClose={()=> setProjectPopup(false)}/>}

    {/* It skills dekhane ke liye... */}
        {ID==='ITSkills' && 
        <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className=" border-b border-gray-400 text-left">
          <th className="py-3 px-4 font-medium text-gray-500">Skills</th>
          <th className="py-3 px-4 font-medium text-gray-500">Version</th>
          <th className="py-3 px-4 font-medium text-gray-500">Last used</th>
          <th className="py-3 px-4 font-medium text-gray-500">Experience</th>
          
        </tr>
      </thead>

      <tbody>
        {It_Skills.map((eachObj: any, index: number) => (
          <tr
            key={index}
            className="border-b border-gray-400 hover:bg-gray-50 transition"
          >
            <td className="py-2 px-4 text-gray-800">{eachObj.skill || "--------"}</td>
            <td className="py-2 px-4 text-gray-800">{eachObj.version || "-------"}</td>
            <td className="py-2 px-4">{eachObj.lastused || "-------"}</td>
            <td className="py-2 px-4">{eachObj.expYears} {eachObj.expMonths || "--------"}</td>
            <td className="py-2 px-4"><MdOutlineEdit className="cursor-pointer text-slate-500"  onClick={()=>{
                    setRowId(eachObj.id.toString());
                    setITSkillsPopup(true)
            }}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        }


      {/* Projects dekhane ke liye... */}

      {
        ID==='Projects' && 

        <div className="flex flex-col gap-3">


          
          { projects.length>0  &&
             projects.map((each:any) => {
              return <div className="flex flex-col">
                 <span className="flex items-center gap-2">{each.projectTitle} {loading ? <Spinner/>:<MdDeleteOutline  
                 onClick={()=> DeleteProject(each.id)}
                 
                 className="text-slate-500 cursor-pointer text-lg hover:text-slate-700"/>} </span>
                 <span>{each.client}</span>
                 <span className="text-slate-500 font-normal">{each.startMonth} {each.startYear}</span>
                 <span className="text-slate-500">{each.description}</span>
              </div>
             })
          }
            
        </div>
      }


         



    </div>
   )
}

function formatDate(isoString:any) {
  const date = new Date(isoString);

const options: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};  // ye "Oct 16, 2025" jaisa return karega
const formatted = new Date(isoString).toLocaleDateString("en-GB", options);
  // optional: agar tu chahata hai month pehle aaye "16 Oct, 2025"
  const parts = formatted.split(" ");
  return `${parts[0]} ${parts[1]}, ${parts[2]}`;
}


import {
  
  FiMapPin,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle
} from "react-icons/fi";
import {
  
  MdVerified,
  MdUpload
} from "react-icons/md";



function ProfileCard({
  reloadDetails,
  profilePic,
  setEditUser,
  name,
  email,
  phone,
  city,
  exp,
  updated,
  verify,
  availability
}: any) {
  const [showVerifyEmail, setShowEmail] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageResLoader, setImageResLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  
  const MAX_SIZE = 2 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  async function handleImageChange(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setMessage("Only JPG, PNG or WEBP images are allowed");
      setShowPopup(true);
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      setMessage("Image size must be less than 2MB");
      setShowPopup(true);
      e.target.value = "";
      return;
    }

    setImageResLoader(true);
    setPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("profile", file);

      const response = await axios({
        url: 'https://jobportalbackend-whpt.onrender.com/user/uploadImage',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: formData
      });

      if (response.data && response.data.ok) {
        setMessage("Image uploaded successfully!");
        setShowPopup(true);
        reloadDetails();
      }
    } catch (err: any) {
      console.error(err);
      setMessage(
        err.response?.data?.msg || 
        err.message || 
        "Something went wrong. Please try again."
      );
      setShowPopup(true);
    } finally {
      setImageResLoader(false);
    }
  }

  async function handleRemoveImage() {
    setImageResLoader(true);
    try {
      const removeReq = await axios({
        url: 'https://jobportalbackend-whpt.onrender.com/user/removeProfilePic',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        method: 'DELETE'
      });

      if (removeReq.data && removeReq.data.ok) {
        setMessage("Profile picture removed successfully");
        setShowPopup(true);
        reloadDetails();
      }
    } catch (err: any) {
      console.error(err);
      setMessage(
        err.response?.data?.msg || 
        err.message || 
        "Something went wrong. Please try again."
      );
      setShowPopup(true);
    } finally {
      setImageResLoader(false);
    }
  }

  // Profile completion items
  const profileItems = [
    {
      id: 1,
      title: "Verify Email",
      icon: <FiMail className="text-blue-500" />,
      completed: verify === 'Verified',
      score: 20
    },
    {
      id: 2,
      title: "Add Preferred Location",
      icon: <FiMapPin className="text-green-500" />,
      completed: !!city,
      score: 15
    },
    {
      id: 3,
      title: "Upload Resume",
      icon: <LuClipboardCopy className="text-purple-500" />,
      completed: false, // Add logic based on your data
      score: 25
    },
    {
      id: 4,
      title: "Add Work Experience",
      icon: <FiBriefcase className="text-orange-500" />,
      completed: !!exp,
      score: 20
    },
    {
      id: 5,
      title: "Set Availability",
      icon: <FiCalendar className="text-pink-500" />,
      completed: !!availability,
      score: 20
    }
  ];

  const totalScore = profileItems.reduce((sum, item) => 
    item.completed ? sum + item.score : sum, 0
  );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100 p-8 w-full max-w-6xl mx-auto">
      {/* Popup Notification */}
      <TopPopup
        show={showPopup}
        text={message}
        bg="bg-gradient-to-r from-blue-600 to-cyan-500"
        duration={2500}
        onClose={() => setShowPopup(false)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Profile Image & Basic Info */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image Section */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                
                <div className="relative">
                  {preview || profilePic ? (
                    <div className="relative">
                      <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                        <img
                          src={preview || profilePic}
                          alt="Profile"
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            imageResLoader ? "blur-md scale-95" : "group-hover:scale-105"
                          }`}
                        />
                      </div>
                      
                      {/* Image Loader */}
                      {imageResLoader && (
                        <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                        <button
                          onClick={() => fileRef.current?.click()}
                          disabled={imageResLoader}
                          className="px-4 py-2 bg-white shadow-lg rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                          <MdUpload className="text-lg" />
                          Update
                        </button>
                        
                        {profilePic && !imageResLoader && (
                          <button
                            onClick={handleRemoveImage}
                            className="px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 shadow-lg rounded-full font-medium hover:bg-red-100 transition-all flex items-center gap-2"
                          >
                            <MdDeleteOutline className="text-lg" />
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileRef.current?.click()}
                      className="w-48 h-48 rounded-2xl border-4 border-dashed border-gray-300 hover:border-blue-400 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center cursor-pointer transition-all group-hover:scale-105"
                    >
                      <FaUserCircle className="text-gray-400 text-6xl mb-2" />
                      <span className="text-gray-500 font-medium">Upload Photo</span>
                      <span className="text-gray-400 text-sm">JPG, PNG, WEBP up to 2MB</span>
                    </div>
                  )}
                  
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {name?.toUpperCase()}
                    </h1>
                    <button
                      onClick={() => setEditUser(true)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <FiEdit2 className="text-gray-600 hover:text-blue-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 mb-6">
                    <LucideAlertCircle className="text-sm" />
                    <span className="text-sm">Profile last updated - {updated}</span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiMapPin className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium text-gray-900">{city || "Not specified"}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiBriefcase className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Experience</div>
                      <div className="font-medium text-gray-900">
                        {exp?.[0]?.toUpperCase() + exp?.slice(1).toLowerCase() + ' yrs' || "Add experience"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <PiShoppingBagOpenLight className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Availability</div>
                      <div className="font-medium text-gray-900">
                        {availability || 'Add availability'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiPhone className="text-orange-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="font-medium text-gray-900">{phone || "Add phone"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Section with Verification */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FiMail className="text-gray-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Email Address</div>
                      <div className="font-medium text-gray-900">{email}</div>
                    </div>
                  </div>
                  
                  {verify === 'Verified' ? (
                    <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full">
                      <MdVerified className="text-lg" />
                      <span className="font-medium text-sm">Verified</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowEmail(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5 font-medium flex items-center gap-2"
                    >
                      Verify Email
                      <FiCheckCircle className="text-lg" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Completion */}
        
      </div>

      {/* Verify Email Modal */}
      {showVerifyEmail && <VerifyGmail onClose={() => setShowEmail(false)} />}
    </div>
  );
}



function VerifyGmail({ onClose }: any) {

  const [msg,setMsg] = useState('')
  const [loading,setLoading] =useState(false)
  async function VerifyMail(){
    setLoading(true)
    try{
      const Sending = await axios({
        url:'https://jobportalbackend-whpt.onrender.com/user/VerifyEmailLink',
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        method:'POST'
      })

      if(Sending.data && Sending.data.ok) {
          setMsg('Verification email sent! Please check your inbox.')
      }
    }
    catch(err){
       console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="fixed inset-0 flex font-aman items-center justify-center bg-black/80 z-50">
      <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
        
        {/* Close Button */}
        <div className="flex items-center justify-end">
          <GiTireIronCross 
            onClick={onClose} 
            className="text-slate-500 cursor-pointer text-xl" 
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800">Verify Your Email Address</h2>

          {/* Description */}
          <div className="text-gray-600 space-y-4">
            <p>
              Please verify your email address to unlock all features and improve your profile visibility.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-blue-800 mb-2">Why verified emails are preferred by recruiters?</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <span className="font-medium">Authenticity:</span> Confirms your identity and professionalism</li>
                <li>• <span className="font-medium">Reliability:</span> Ensures recruiters can reach you easily</li>
                <li>• <span className="font-medium">Seriousness:</span> Shows you're genuinely seeking opportunities</li>
                <li>• <span className="font-medium">Security:</span> Reduces fake profiles and spam</li>
                <li>• <span className="font-medium">Priority:</span> Verified profiles often appear higher in search results</li>
              </ul>
            </div>

            <p className="text-sm text-gray-500">
              Recruiters are 3x more likely to contact candidates with verified email addresses.
            </p>
          </div>

          {/* Verify Button */}
          <button onClick={VerifyMail} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105">
            {loading ? <Spinner/>:'Verify Email Address'}
          </button>

          <p className="text-purple-500 animate-pulse font-medium" hidden={!msg}>{msg}</p>

          {/* Resend Option */}
          <p className="text-sm text-gray-500">
            Didn't receive the verification email?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium underline">
              Resend Verification Link
            </button>
          </p>
        </div>


        

      </div>
    </div>
  )
}



import { FiChevronRight, FiUpload, FiEdit, FiPlus } from "react-icons/fi";


function QuickLinks() {
    const [activeLink, setActiveLink] = useState<string | null>(null);

    function scrollToId(id: string) {
        const element = document.getElementById(id);
        if (element) {
            setActiveLink(id);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                setActiveLink(null);
            }, 2000);
        }
    }

    const links = [
        { id: 'Resume', label: 'Resume', action: 'Upload', color: 'blue' },
        { id: 'Headline', label: 'Resume headline', action: null, color: 'purple' },
        { id: 'KeySkills', label: 'Key skills', action: 'Add', color: 'green' },
        { id: 'Education', label: 'Education', action: 'Add', color: 'indigo' },
        { id: 'ITSkills', label: 'IT skills', action: 'Add', color: 'orange' },
        { id: 'Projects', label: 'Projects', action: 'Add', color: 'red' },
        { id: 'Summary', label: 'Profile summary', action: 'Add', color: 'cyan' },
        { id: 'CareerProfile', label: 'Career profile', action: null, color: 'amber' },
        { id: 'PersonalDetails', label: 'Personal details', action: null, color: 'pink' }
    ];

    const colorClasses: { [key: string]: string } = {
        blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200',
        purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-200',
        green: 'bg-green-100 text-green-600 hover:bg-green-200 border-green-200',
        indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 border-indigo-200',
        orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200 border-orange-200',
        red: 'bg-red-100 text-red-600 hover:bg-red-200 border-red-200',
        cyan: 'bg-cyan-100 text-cyan-600 hover:bg-cyan-200 border-cyan-200',
        amber: 'bg-amber-100 text-amber-600 hover:bg-amber-200 border-amber-200',
        pink: 'bg-pink-100 text-pink-600 hover:bg-pink-200 border-pink-200'
    };

    return (
        <div className="sticky top-6 h-fit rounded-2xl bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-200/80 shadow-lg p-6 w-full max-w-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Quick Links
                </h1>
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                </div>
            </div> 

            {/* Links List */}
            <div className="space-y-2">
                {links.map((link) => (
                    <div 
                        key={link.id}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                            activeLink === link.id 
                                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 shadow-md transform scale-[1.02]' 
                                : 'hover:bg-gray-50/80 hover:shadow-sm border border-transparent hover:border-gray-100'
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToId(link.id);
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r from-${link.color}-500 to-${link.color}-400`}></div>
                            <span className={`font-medium ${activeLink === link.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                {link.label}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {link.action && (
                                <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${colorClasses[link.color]} transition-colors`}>
                                    {link.action === 'Upload' ? (
                                        <FiUpload className="inline mr-1 text-sm" />
                                    ) : (
                                        <FiPlus className="inline mr-1 text-sm" />
                                    )}
                                    {link.action}
                                </span>
                            )}
                            <div className={`p-1.5 rounded-lg transition-all ${activeLink === link.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <FiChevronRight className={`text-sm ${activeLink === link.id ? 'rotate-90' : ''} transition-transform`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100"></div>

          

            {/* Quick Tip */}
            <div className="mt-6 p-3 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-lg border border-blue-100/50">
                <p className="text-xs text-gray-600 text-center">
                    Complete profile for <span className="font-semibold text-blue-600">5x more visibility</span>
                </p>
            </div>
        </div>
    );
}



function Disability_Banner({ setShowDisability }: any) {
    const [loading, setLoading] = useState(false);
    const [disability, setDisability] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    async function Disability() {
        setLoading(true)
        try {
            const Posting = await axios({
                url: "https://jobportalbackend-whpt.onrender.com/user/disability",
                data: {
                    disability: disability,
                    email: localStorage.getItem('email')
                },
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                }
            })

            if (Posting.data && Posting.data.ok) {
                setShowDisability(false)
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl w-full bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-200/80 shadow-2xl rounded-3xl p-6 relative overflow-hidden">
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50/20 to-pink-50/20 rounded-full translate-y-12 -translate-x-8"></div>
            
            {/* Header Badge */}
            <div className="flex justify-end mb-4">
                <span className="bg-gradient-to-r from-purple-100 to-purple-50 text-purple-600 text-xs font-semibold px-4 py-2 rounded-full border border-purple-200/60 shadow-sm">
                    Diversity & inclusion
                </span>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Title */}
                <div className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                    Companies want to build inclusive teams, help us identify your disability status for better jobs.
                </div>

                {/* Options */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div
                        onClick={() => {
                            setDisability('true');
                            setSelectedOption('true');
                        }}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 ${
                            selectedOption === 'true'
                                ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-300 shadow-md'
                                : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50/50'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                                selectedOption === 'true' ? 'text-purple-700' : 'text-gray-700'
                            }`}>
                                I have a disability
                            </span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedOption === 'true'
                                    ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-purple-400'
                                    : 'border-gray-300'
                            }`}>
                                {selectedOption === 'true' && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                            setDisability('false');
                            setSelectedOption('false');
                        }}
                        className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 ${
                            selectedOption === 'false'
                                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 shadow-md'
                                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50/50'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                                selectedOption === 'false' ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                                I don't have a disability
                            </span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedOption === 'false'
                                    ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-cyan-400'
                                    : 'border-gray-300'
                            }`}>
                                {selectedOption === 'false' && (
                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        onClick={Disability}
                        disabled={!disability || loading}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                            disability && !loading
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        } ${
                            loading ? 'opacity-70' : ''
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Updating...
                            </div>
                        ) : (
                            'Submit'
                        )}
                    </button>
                </div>
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-gray-100/60">
                <p className="text-xs text-gray-500 text-center">
                    Your response helps us create more inclusive opportunities
                </p>
            </div>
        </div>
    )
}
import { MdDelete } from "react-icons/md";
import TopPopup from "./topPopUp";


function ResumeUpdate({existingResumeUrl,reloadDetails}:any){
      const [ResumeAndSummaryShow,setResumeandSummaryShow] = useState(false);
      
      const [headline,setHeadline] = useState('');

      async function Gettingheadline(){
        try{
           const Data = await axios({
            url:`https://jobportalbackend-whpt.onrender.com/user/resume_headline?email=${localStorage.getItem('email')}`,
            method:'GET',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token') || ""}`
            }
           })

           if(Data.data && Data.data.ok){ 
                  setHeadline(Data.data.headline)
           }
        }
        catch(err){
              console.log(err)
        }
      }

      useEffect(()=>{
           Gettingheadline()
      },[])

      // const CLOUD_NAME = "dxi4co0lo"
      // const UPLOAD_PRESET = "resume_upload" 
        const [file, setFile] = useState<File | null>(null)
        const [loading, setLoading] = useState(false)
        const [message, setMessage] = useState<string>("")
        const [error, setError] = useState<string>("")
        const [resumeUrl, setResumeUrl] = useState<string>("") // 👈 yahan store hoga uploaded resume ka url
      
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = e.target.files?.[0]
          if (!selectedFile) return
      
          const allowedTypes = [
            "application/pdf",
            
          ]
      
          if (!allowedTypes.includes(selectedFile.type)) {
            setError("Only PDF are allowed")
            setFile(null)
            return
          }
      
          if (selectedFile.size > 5 * 1024 * 1024) {
            setError("File size must be under 5MB")
            setFile(null)
            return
          }
      
          setError("")
          setMessage("")
          setFile(selectedFile)
        }
      


        const uploadResume = async () => {
          if (!file) return
          setLoading(true)
          setError("")
          setMessage("")
           setResumeUrl("")
      
          try {

            const formData = new FormData()
            formData.append("file", file)
            
      
            // first uploading file to cloudinary by backend
            const Uploading_through_backend = await axios({
              url:'https://jobportalbackend-whpt.onrender.com/user/upload_resume',
              method:'POST',
              data:formData,
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                
              }

            })

            console.log("Uploading_through_backend->" + Uploading_through_backend.data.secure_url);
            
            if(Uploading_through_backend.data && Uploading_through_backend.data.resumeUrl ){
              setResumeUrl(Uploading_through_backend.data.resumeUrl) // 👈 yahan set kar rahe
              setMessage("Resume uploaded successfully ✅")
              reloadDetails()
            }

             
            setFile(null)
           
          } catch (err: any) {
              const msg =
                err.response?.data?.msg || "Something went wrong";
              setMessage(msg);
          }finally {
            setLoading(false)
          }
        }


        const deleteResume = async()=>{
             try{
                const DeletingResume = await axios({
                  url:'https://jobportalbackend-whpt.onrender.com/user/deleteResumeFromCloud',
                  method:"DELETE",
                  headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                  }
                })

                if(DeletingResume.data && DeletingResume.data.ok){
                  reloadDetails()
                }
             }
             catch(err:any){
               console.log(err.response?.data?.msg || "Something went wrong")
             }
        }


    return (
        <div id="Resume" className="flex transition-all duration-200 bg-inherit flex-col gap-3">
            {/* First upper div */}
   <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-3 mb-2">

        <div className="flex justify-between items-center">
        <h2 className=" text-lg text-gray-800">
          Upload Resume  
        </h2>   

      {existingResumeUrl && <span
      onClick={deleteResume}
      className="text-black hover:text-red-500 flex items-center gap-2 text-sm cursor-pointer hover:underline">Delete Resume
        <MdDelete className="text-black hover:text-red-500"/>
      </span>
      }
        </div>
       

      {existingResumeUrl && <div >
       <a
           href={`${existingResumeUrl}`}
          target="_blank"
          rel="noopener noreferrer"
         
        className="text-blue-500 flex items-center gap-2 cursor-pointer hover:font-semibold hover:underline font-medium">Download existing Resume  <BsFileEarmarkPdfFill className="text-black text-xl" />
      </a>
      </div>
      
      
      }
        
      </div>
      


      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500">
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <span className="text-sm text-gray-600">
          Click to upload or drag & drop
        </span>
        <span className="mt-1 text-xs text-gray-400">
          PDF, DOC, DOCX (max 5MB)
        </span>
      </label>

      {file && (
        <div className="mt-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
          📄 {file.name}
          <span className="ml-2 text-xs text-gray-500">
            ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      {message && (
        <p className="mt-3 text-sm text-green-600">{message}</p>
      )}

       {/* 👀 View Resume Button */}
      {resumeUrl && (
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Download Resume
        </a>
         
      )}


      <button
        onClick={uploadResume}
        disabled={!file || loading}
        className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition
          ${
            loading || !file
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      
    </div>



    {/* Resume headline */}

    <div className="p-3 rounded-2xl flex flex-col gap-3 bg-white shadow-lg">
      <div className="flex font-medium items-center gap-3">
        Resume headline  <MdOutlineEdit onClick={()=>setResumeandSummaryShow(true)}  className="text-slate-500 cursor-pointer"/>
      </div> 

      {/* Rendering headline */}
      <div className="text-slate-500 text-sm">
       {headline ? headline:"The recruiter see this and get basic understanding of your resume."}
      </div>

     
    </div>

    {ResumeAndSummaryShow && <Headline_And_ProfileSummary_Div id={"ResumeHeadline"} Headline={'Resume Headline'} Description={'It is the first thing recruiters notice in your profile. Write a concise headline introducing yourself to employers. (Minimum 5 words)'} onClose={()=> setResumeandSummaryShow(false)}/>}

    </div>
    )

}

const Headline_And_ProfileSummary_Div = ({onClose,Headline,Description,id}:any) => {
  
    const[headline,setHeadline] = useState('');
     const maxChar = 150;

     const[loading,setLoading] = useState(false)
  const handleSave = async() => {
    setLoading(true)
    try{
         const Posting = await axios({
        url:`https://jobportalbackend-whpt.onrender.com/user/${id}`,
        data:{
            Data:headline,
            email:localStorage.getItem('email')
        },
        method:'PUT',
        
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token') || ""}`
                }
     })

     if(Posting.data && Posting.data.ok){
        onClose();
     }
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false)
    }
    
  };
  
  
  return (
    <div className="fixed inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
 <div className="bg-white zoom-in rounded-4xl shadow-md p-6 max-w-2xl mx-auto">
     <div className="flex font-medium justify-end hover:font-bold cursor-pointer hover:text-slate-800" onClick={onClose}>
        X
     </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{Headline}</h2>
        <p className="text-gray-600 mt-1">
          {Description}
        </p>
      </div>
      
      <div className="mb-4">
        <textarea
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-0 focus:border-blue-500 resize-none"
          placeholder="Enter your resume headline..."
        />

        <div className="text-slate-500">
            {"("+ (maxChar - headline.length) + ")" + " Chars Left"}
        </div>
        
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!headline || headline.length > maxChar}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300  transition-colors"
        >
          {loading ? <Spinner/> : "Save"}
        </button>
      </div>
    </div>
    </div>
   
  );
};


function Diversity_Inclusion({ setDisabilityPopup, disability }: any) {
    const [militaryExp, setMilitaryexp] = useState('');
    const [career_break, setBreak] = useState('');
    const [loading, setLoading] = useState(false);

    // All your existing logic functions remain exactly the same...
    async function SetDiversity() {
        setLoading(true);
        try {
            const Settled = await axios({
                url: "https://jobportalbackend-whpt.onrender.com/user/setDiversity",
                method: 'PUT',
                data: {
                    militaryExp: militaryExp,
                    careerBreak: career_break,
                    email: localStorage.getItem('email')
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
                }
            });

            if (Settled.data && Settled.data.ok) {
                setDisabilityPopup(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 flex font-aman items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            {/* Modal Container */}
            <div className="bg-gradient-to-br from-white to-gray-50/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/80 p-8 max-w-2xl w-full mx-auto transform transition-all duration-300">
                
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setDisabilityPopup(false)}
                        className="p-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 transition-all duration-300 border border-gray-200/60 hover:border-gray-300/80 cursor-pointer"
                    >
                        <IoMdClose className="text-gray-600 hover:text-gray-800 text-lg transition-colors" />
                    </button>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-400"></div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            Diversity & Inclusion
                        </h2>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Share details to attract recruiters who value people from different backgrounds
                    </p>
                </div>

                {/* Military Status Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">Military status</span>
                        <div className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600">
                            Optional
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {['Currently serving', 'Previously served', 'Never served'].map((option) => (
                            <button
                                key={option}
                                onClick={() => setMilitaryexp(option)}
                                className={`px-5 py-3 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-0.5 ${
                                    militaryExp === option
                                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300 shadow-md text-blue-700 font-semibold'
                                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50/50 text-gray-600'
                                }`}
                            >
                                {option}
                                {militaryExp === option && (
                                    <div className="mt-1 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Career Break Section */}
                <div className="mb-10">
                    <div className="mb-4">
                        <span className="font-semibold text-gray-900 block mb-2">Career break</span>
                        <p className="text-gray-500 text-sm">
                            Help recruiters understand your unique path
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {['Have taken', 'Have not taken'].map((option) => (
                            <button
                                key={option}
                                onClick={() => setBreak(option)}
                                className={`px-5 py-3 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-0.5 ${
                                    career_break === option
                                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-md text-purple-700 font-semibold'
                                        : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50/50 text-gray-600'
                                }`}
                            >
                                {option}
                                {career_break === option && (
                                    <div className="mt-1 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 mx-auto"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end items-center pt-6 border-t border-gray-100/60">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setDisabilityPopup(false)}
                            className="px-6 py-3 text-blue-600 font-medium rounded-lg hover:bg-blue-50/50 transition-all duration-300 border border-transparent hover:border-blue-200/60 cursor-pointer"
                        >
                            Cancel
                        </button>
                        
                        <button
                            onClick={SetDiversity}
                            disabled={!militaryExp || !career_break || loading}
                            className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                                !militaryExp || !career_break
                                    ? 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl cursor-pointer'
                            } ${
                                loading ? 'opacity-70' : ''
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 p-3 bg-gradient-to-r from-blue-50/30 to-cyan-50/30 rounded-xl border border-blue-100/30">
                    <p className="text-xs text-gray-600 text-center">
                        Your information helps create more inclusive opportunities
                    </p>
                </div>
            </div>
        </div>
    );
}


 function KeySkills_Div({onClose}:any){

   const skills = [
  "Spoken English",
  "English",
  "Typing Speed",
  "Data Entry",
  "Grammar",
  "Convincing Power",
  "Non Voice Process",
  "Interpersonal Skills",
  "Fluent English",
  "Written Communication",
   ];
   
   const [loading,setLoading] = useState(false)
   const [skills_array,setSkillsArray] = useState<String []>([]);
   const [inputSkills,setInputSkills] = useState('');

   function HandleAddSkills(each:any){
    const skill = each.trim();
    if (!skill) return;
    if (!skills_array.map(s => s.toLowerCase()).includes(skill.toLowerCase())) {
        setSkillsArray(prev => [...prev, skill]);
        setInputSkills(''); // clear input after add
    }
   }

    function HandleRemoveSkills(each: string) {
        setSkillsArray(prev => prev.filter(skill => skill !== each));
    }


   async function GettingAlreadySkills(){
     try{
         const Data = await axios({
            url:'https://jobportalbackend-whpt.onrender.com/user/getKeySkills',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            method:'GET'
         })

         if(Data.data && Data.data.ok){
            setSkillsArray(Data.data.skills);
         }
     }
     catch(err){
        console.log(err)
        alert(err)
     }
   }


   async function PostingUpdatedSkills(){
    setLoading(true)
    try{
       const Data = await axios({
        url:'https://jobportalbackend-whpt.onrender.com/user/postKeySkills',
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,

        },
        method:'POST'
        ,
        data:{
            skills:skills_array
        }
       })

       if(Data.data && Data.data.ok){
        console.log(Data.data.data)
         onClose();
       }
    }
    catch(err){
        console.log(err);
        alert(err)
    }
    finally{
        setLoading(false)
    }
   }

   useEffect(()=>{
       GettingAlreadySkills()
   },[])
    return (
        <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
               <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">

                <div className="flex items-center justify-end">
                     <GiTireIronCross onClick={onClose} className="text-slate-500 cursor-pointer text-xl" />
                </div>
                   
                   <div className="flex flex-col gap-1 ">
                    <span className="text-2xl font-medium">Key skills</span>
                    <p className="text-sm text-slate-500">Add skills that best define your expertise, for e.g, Direct Marketing, Oracle, Java, etc. (Minimum 1)</p>
                   </div>

{/* Purani skills */}
                   <div className="flex flex-col gap-1">
                      <span className="font-medium text-md">Skills</span>

                      <div className="flex flex-wrap gap-1">
                        {
                            skills_array.length > 0 &&
                            skills_array.map((each:any)=>{
                                return <span className="text-slate-500 bg-gray-100 flex border border-gray-400 rounded-full px-3 py-1 items-center gap-2 hover:bg-gray-200 text-sm">{each}  <RxCross1 className="text-black cursor-pointer font-semibold" 
                                onClick={()=> HandleRemoveSkills(each)}
                                /></span>
                            })
                        }
                      </div>
                   </div>


                {/* Adding skills input */}
                <div className="flex flex-col gap-2 items-start">
                    <input
                    onChange={(e)=> setInputSkills(e.target.value)}
                    type="text" placeholder="Add skills" className="w-full p-2 placeholder-slate-500 outline-0 border border-gray-400 rounded-xl" />

                    <span 
                    onClick={()=> HandleAddSkills(inputSkills)}
                    className=" border border-gray-400 rounded-full px-4 py-2  cursor-pointer text-black hover:bg-black hover:text-white transition-all duration-200">Add</span>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <p className="font-medium text-md">Or you can select from the suggested set of skills</p>

                    <div className="flex flex-wrap gap-2">
                        {
                          skills.map((each:any)=>{
                            return <span
                            onClick={()=>{
                                HandleAddSkills(each);
                            }}
                            className={`border cursor-pointer  border-gray-400 px-3 py-1 rounded-full text-slate-600 hover:bg-gray-200 `}>{each + " +"}</span>
                          })
                        }
                    </div>
                </div>


                <div className="flex justify-end mt-5 pr-3">
                    <div className="flex items-center gap-5">
                        <span onClick={onClose} className="text-blue-500 cursor-pointer font-medium">Cancel</span>
                        <span
                        onClick={PostingUpdatedSkills}
                        className="bg-blue-500 text-white rounded-full font-medium cursor-pointer px-4 py-2">{loading ? <Spinner/>:'Save'}</span>
                    </div>
                </div>
               </div>
        </div>
    )
}

function PersonalDetails({onClose}:any){

     const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 40 }, (_, i) => 2007 - i);

 const indianLanguages = [
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Malayalam",
  "Punjabi",
  "Assamese",
  "Maithili",
  "Santali",
  "Kashmiri",
  "Nepali",
  "Konkani",
  "Manipuri (Meitei)",
  "Bodo",
  "Dogri",
  "Mizo",
  "English",
  "Sindhi",
  "Sanskrit",
  "Ladakhi"
];


interface LanguageType {
  language: string;
  proficiency: string;
  ableArray: string[];
  id:string
}

interface DateType {
    date:string;
    month:string;
    year:string;
}

interface MyFormData{
    gender:string;
    moreInfo:string[];
    maritalStatus:string;
    category:string;
    parmanentAddress:string;
    hometown:string;
    pincode:string
}



//   Array of objects that contain language , proficiency and array of read ,write and speak.
   const [LanguageObj,setLanguageObj] = useState<LanguageType[]>([])
   const [dateObj,setDateObj] = useState<DateType>({
  date: "",
  month: "",
  year: ""
});


function AddLanguageDiv(){
   setLanguageObj((prev:any)=>[...prev,{language:"",proficiency:"",ableArray:[],id:Math.random()}]);
}

function HandleDeleteObject(id:any){
    console.log("Id of Language"+id)
    setLanguageObj((prev:any) => prev.filter((val:any) => !(id==val.id)))
}


 // 🌀 Handle updates for language or proficiency dropdowns
  const handleSelectChange = (
    id: string,
    field: "language" | "proficiency",
    value: string
  ) => {
    setLanguageObj((prev) =>
      prev.map((obj) =>
        obj.id === id ? { ...obj, [field]: value } : obj
      )
    );
  };

   // ✅ Handle checkbox (Read, Write, Speak)
  const handleCheckboxChange = (id: string, value: string, checked: boolean) => {
    setLanguageObj((prev) =>
      prev.map((obj) => {
        if (obj.id === id) {
          const updatedArray = checked
            ? [...obj.ableArray, value]
            : obj.ableArray.filter((v) => v !== value);
          return { ...obj, ableArray: updatedArray };
        }
        return obj;
      })
    );
  };


  const [formData,setFormData] = useState<MyFormData>({
    gender:"",
    moreInfo:[],
    maritalStatus:"",
    category:"",
    parmanentAddress:"",
    hometown:"",
    pincode:""
  });

  function handleMoreInfo(each:any){
        if(formData.moreInfo.includes(each)){
            setFormData(prev => ({...prev,moreInfo:prev.moreInfo.filter(v => v!=each)}))
        }
        else {
            setFormData(prev => ({...prev,moreInfo:[...prev.moreInfo,each]}))
        }
  }

  const [loading,setLoading] = useState(false)

  const [msg,setMsg] = useState({
    msg:"",
    id:""
  })

  function Checking_Language_Empty_TohNhi(){
       if(LanguageObj.length > 0){
            const invalid = LanguageObj.some(val => val.language==='' || val.proficiency==='');
            if(invalid) return true;
        }
        return false; 
  }

  async function HandleSubmit_FinalData (){


    // All date fields should be Empty or Filled
    if(!(dateObj.month=='' && dateObj.year=='' && dateObj.date=='') && (!dateObj.year || !dateObj.month || !dateObj.date) ){
          setMsg({msg:"Can't have an empty field in Date",id:"Date"});
          alert('Error for date');
          return ;
    }

   

    if(LanguageObj.length > 0){
       const invalid = LanguageObj.some(val => val.language==='' || val.proficiency==='');

       if(invalid){
        setMsg({ msg: "Fill all the fields in Languages", id: "Language" });
        alert("Error language");
       
        return;
       }
    } 



    setLoading(true)
    const finalData:any = {};

    // 🔹 formData ke andar se sirf filled fields rakhna
  Object.entries(formData).forEach(([key, value]) => {
    if (
      value !== "" &&
      value !== null &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      finalData[key] = value;
    }
  });

  // 🔹 Agar languageObj me kuch add hua hai
  if (LanguageObj.length > 0) {
    finalData.languageArr = LanguageObj;
  }

   // 🔹 Agar dateObj me kuch actual value hai
  if (dateObj.date && dateObj.month && dateObj.year) {
    finalData.dateOfBirth = dateObj;
  }

  console.log("Here is your finalData + " ,finalData)


  try{
      const ResponseData = await axios({
        url:'https://jobportalbackend-whpt.onrender.com/user/postPersonalDetails',
        method:'POST',
        data:{
            finalData
        },
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(ResponseData.data && ResponseData.data.ok){
           onClose();
      }
  }
  catch(err){
    console.log(err);
    alert(err)
  }
  finally{
    setLoading(false)
  }
  }

    return (
        <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
            <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-10 shadow-md p-8 max-w-2xl mx-auto">


                <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


                <div className="flex flex-col gap-2">
                    <span className="text-xl font-medium">Personal Details</span>
                    <p className="text-slate-600 font-medium">This information is important for employers to know you better</p>
                </div>

{/* Gender */}
                <div className="flex flex-col">
                    <span className="font-medium">Gender</span>
                    <div className="flex gap-3 items-center">
                        <span onClick={()=> setFormData(prev => ({...prev,gender:'male'}))} className={`text-slate-500 border rounded-full ${formData.gender ===('male') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Male</span>
                        <span onClick={()=> setFormData(prev => ({...prev,gender:'female'}))} className={`text-slate-500 border rounded-full ${formData.gender === ('female') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Female</span>
                        <span onClick={()=> setFormData(prev => ({...prev,gender:'transgender'}))} className={`text-slate-500 border rounded-full ${formData.gender === ('transgender') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Transgender</span>
                    </div>
                </div>


{/* More information */}

                <div className="flex flex-col ">
                    <span className="font-medium">More information</span>
                    <p className="text-sm font-medium text-slate-500">Companies are focusing on equal opportunities and might be looking for candidates from diverse backgrounds.</p>

                    <div className="flex mt-2 gap-3 items-center">
                        <span onClick={()=>{
                            handleMoreInfo("single_parent")
                        }} className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('single_parent') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Single parent +</span>
                        <span onClick={()=>{
                            handleMoreInfo("working_mother")
                        }}  className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('working_mother') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Working mother +</span>
                        <span onClick={()=>{
                            handleMoreInfo("retired")
                        }} className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('retired') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Retired(60+) +</span>
                        <span onClick={()=>{
                            handleMoreInfo("lgbtq+")
                        }} className={`text-slate-500 border rounded-full ${formData.moreInfo.includes('lgbtq+') ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>LGBTQ +</span>
                    </div>
                </div>  

{/* Marital Status */}
                <div>
                    <span className="font-medium">Martial status</span>
                    <div className="flex gap-3 items-center flex-wrap">
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'single'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='single' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Single/Unmarried</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'married'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='married' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Married</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'widowed'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='widowed' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Widowed</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'divorced'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='divorced' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Divorced</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'separated'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='separated' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Separated</span>
                       <span onClick={()=>{
                        setFormData(prev => ({...prev , maritalStatus:'other'}))
                       }} className={`text-slate-500 border rounded-full ${formData.maritalStatus==='other' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Other</span>
                    </div>
                </div>

{/* DOB */}
                <div className="flex flex-col gap-1"> 
                    <span className="font-medium">Date of birth</span>

                    <div className="flex gap-2">
                        <select onChange={(e)=> setDateObj(prev => ({...prev,date:e.target.value}))} defaultValue={""} name="" id="" className="border border-gray-400 placeholder-slate-500 w-[33%] p-2 rounded-lg">

                            <option value=""  disabled hidden>DD</option>
                            {
                                days.map((e)=>{
                                    return <option value={e} key={e}>{e}</option>
                                })
                            }
                            
                        </select>

                        <select onChange={(e)=> setDateObj(prev => ({...prev,month:e.target.value}))} name="" id="" defaultValue={""} className="border border-gray-400 placeholder-slate-500 w-[33%] p-2 rounded-lg">
                             <option value="" disabled hidden>MM</option>
                            {
                                months.map((val,ind)=>{
                                    return <option value={val} key={ind}>{val}</option>
                                })
                            }
                        </select>

                        <select onChange={(e)=> setDateObj(prev => ({...prev,year:e.target.value}))} name="" id="" defaultValue={""} className="border border-gray-400 placeholder-slate-500 w-[33%] p-2 rounded-lg">
                              <option value="" disabled hidden>YYYY</option>
                            {
                                years.map((y)=>{
                                    return <option value={y} key={y}>{y}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className={`text-red-500 text-sm ${dateObj.year && dateObj.date && dateObj.month   ? 'hidden':''} `}>
                        {msg.id==='Date' ? msg.msg:''}
                    </div>
                </div>

{/* category */}

                <div className="flex flex-col gap-1">
                    <span className="font-medium">Category</span>
                    <p className="text-slate-500"> Companies welcome people from various categories to bring equality among all citizens</p>
                    <div className="flex flex-wrap gap-2 max-w-4xl">
                        <span onClick={()=> setFormData(prev => ({...prev,category:'general'}))} className={`text-slate-500 border rounded-full ${formData.category==='general' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>General</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'sc'}))} className={`text-slate-500 border rounded-full ${formData.category==='sc' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Scheduled Caste(SC)</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'st'}))} className={`text-slate-500 border rounded-full ${formData.category==='st' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Scheduled Tribe(ST)</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'obc_creamy'}))} className={`text-slate-500 border rounded-full ${formData.category==='obc_creamy' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>OBC-Creamy</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'obc_non_creamy'}))} className={`text-slate-500 border rounded-full ${formData.category==='obc_non_creamy' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>OBC - Non Creamy</span>
                        <span onClick={()=> setFormData(prev => ({...prev,category:'other'}))} className={`text-slate-500 border rounded-full ${formData.category==='other' ? 'bg-gray-200':''} border-gray-400 py-1 px-4 cursor-pointer`}>Other</span>
                    </div>
                </div>

{/* Permanend Address */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium"> Permanent address</span>
                    <input onChange={(e) => setFormData(prev => ({...prev,parmanentAddress:e.target.value}))} type="text" placeholder="Enter your permanent address" className="w-full placeholder-slate-500 p-3 rounded-2xl border border-gray-400 outline-0" />
                </div>
{/* Hometown */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Hometown</span>
                    <input onChange={(e) => setFormData(prev => ({...prev,hometown:e.target.value}))} type="text" placeholder="Enter your hometown" className="w-full placeholder-slate-500 p-3 rounded-2xl border border-gray-400 outline-0" />
                </div>

{/* Pincode */}
                 <div className="flex flex-col gap-2">
                    <span className="font-medium">Pincode</span>
                    <input onChange={(e) => setFormData(prev => ({...prev,pincode:e.target.value}))} type="text" placeholder="Enter your pincode" className="w-full placeholder-slate-500 p-3 rounded-2xl border border-gray-400 outline-0" />
                </div>

{/*Language proficiency*/}

                <div className="flex flex-col gap-6">
                     <div className="flex flex-col gap-1">
                        <span className="font-medium">Language proficiency</span>
                        <p className="text-slate-500">Strengthen your resume by letting recruiters know you can communicate in multiple languages</p>
                     </div>

                     <div className={`text-red-500 text-sm animate-pulse ${Checking_Language_Empty_TohNhi() ? '':'hidden'}`}>
                        {msg.id==='Language' ? msg.msg:''}
                     </div>

                     <div className="flex flex-col gap-9">
                        {
                            LanguageObj.length > 0 &&
                            LanguageObj.map((val:any)=>{
                                return <div id={val.id} key={val.id} className="flex items-center gap-3">

                                       <div className="flex flex-col gap-3 w-full">

                                    <div className="flex gap-3 items-center">
                                        {/* Language* */}
                                       <div className="w-[50%]">
                                        <span className="flex font-medium items-center">Language<sup className="text-red-400">*</sup></span>

                                       <select
                                        onChange={(e) =>
                                            handleSelectChange(val.id, "language", e.target.value)
                                        }
                                       defaultValue={""} value={val.language} className="border w-full placeholder-slate-400 border-gray-400 p-3 rounded-2xl text-gray-600" name="" aria-placeholder="Select language" id=""
                                      
                                       >
                                        <option value="" disabled hidden>Select language</option>
                                        {
                                            indianLanguages.map((each:any)=>{ 
                                                return <option key={each} value={each}>{each}</option>
                                            })
                                        }
                                       </select>
                                       </div>

                                    {/* Proficiency* */}
                                       <div className="w-[50%]">
                                        <span className="flex font-medium items-center">Proficiency<sup className="text-red-400">*</sup></span>


                                       <select
                                        onChange={(e) =>
                                            handleSelectChange(val.id, "proficiency", e.target.value)
                                        }
                                       defaultValue={""} value={val.proficiency} className="border w-full border-gray-400 p-3 rounded-2xl text-gray-600" name="" id="">
                                        <option value="" disabled hidden>Select language</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Proficient">Proficient</option>
                                        <option value="Expert">Expert</option>
                                       </select>
                                       </div>
                                    </div>
                                   
                                        {/* Check box read , write  and speak */}
                                       <div className="flex justify-between px-3 items-center text-md text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <input
                                            onChange={(e) =>
                                            handleCheckboxChange(val.id, "Read", e.target.checked)
                                            }
                                             checked={val.ableArray.includes('Read')}
                                            type="checkbox" className="rounded-xl border border-gray-400 transition-all duration-300"/>
                                            <span className="">Read</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                             onChange={(e) =>
                                            handleCheckboxChange(val.id, "Speak", e.target.checked)
                                            }
                                             checked={val.ableArray.includes('Speak')}
                                            type="checkbox" className="rounded-xl border border-gray-400 transition-all duration-300" />
                                            <span>Speak</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                             onChange={(e) =>
                                            handleCheckboxChange(val.id, "Write", e.target.checked)
                                            }
                                             checked={val.ableArray.includes('Write')}
                                            type="checkbox" className="rounded-xl border border-gray-400 transition-all duration-300" />
                                            <span>Write</span>
                                        </div>
                                       </div>

                                       </div>
                                 
                                       <div>
                                        <span
                                        onClick={()=> HandleDeleteObject(val.id)}
                                        className="text-blue-500 font-medium cursor-pointer">Delete</span>
                                       </div>
                                </div>
                            })
                        }
                     </div>

                     <div>
                        <span onClick={AddLanguageDiv} className="text-blue-500 cursor-pointer font-medium">Add language</span>
                     </div>


                </div>


{/* cancel and save button */}

                <div className="flex justify-center items-center gap-7 mt-5">
                    <span onClick={onClose} className="text-blue-500">Cancel</span>
                    <span onClick={HandleSubmit_FinalData} className="px-4 py-2 bg-blue-500  cursor-pointer hover:bg-blue-400 text-white rounded-full font-medium">{loading ? <Spinner/>:'Save'}</span>
                </div>


                



            </div>
        </div>
    )
}

function CareerProfile({onClose}:any){

    const[preferredLocations,setPreferedLocations] = useState<String[]>([]);

     const [showList,setShowList] = useState(false);
     const cities = ["Bengaluru", "Mumbai", "Pune", "Chennai", "Hyderabad", "Gurugram","Noida","Ahmedabad","Kolkata","Delhi/NCR","Remote"];
     const Departments = [
    "BFSI, Investments & Trading",
    "Customer Success, Service & Operations",
    "Data Science & Analytics",
    "Engineering - Hardware & Networks",
    "Engineering - Software & QA",
    "Finance & Accounting",
  ];

     function HandleSelect(city:string){
         setPreferedLocations(prev => prev.includes(city) ? prev.filter(v => v!==city):[...prev,city])
     }


     const [showIndustry,setShowIndus] = useState(false);
     const [showDepartment,setShowDepartment] = useState(false);


     const [industry,setIndustry] = useState('')
     const [department,setDepartment] = useState('')

     const [jobType,setJobType] = useState<String[]>([])
     const [employmentType,setEmployment] = useState<String[]>([])
     const [shiftType,setShift] = useState('')

     function handleCheckJobType(job:any){
          setJobType(prev => prev.includes(job) ? prev.filter(v => v!==job):[...prev,job]);
     }
     function handleCheckEmploymentType(employment:any){
          setJobType(prev => prev.includes(employment) ? prev.filter(v => v!==employment):[...prev,employment]);
     }



   return (
    <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
         <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
               <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>

                <div className="flex flex-col gap-1">
                <span className="text-2xl font-medium text-gray-800">
                    Career profile
                </span>
                <p className="text-sm text-gray-600">
                    Add details about your current and preferred job profile. 
                    This helps us personalise your job recommendations.
                </p>
                </div>



                <div className="flex flex-col gap-1">
                    <span className="font-medium">Current industry <sup className="text-red-500">*</sup></span>
                    <input value={industry} onClick={()=> setShowIndus(prev => !prev)} type="text" placeholder="Select industry of your current company" className="w-full p-3 cursor-pointer rounded-2xl border border-gray-400 outline-0" />

                    {showIndustry &&  
                    
                    <div className="absolute z-10 p-2 w-[600px]  flex flex-col bg-white  rounded-md mt-20 shadow-lg max-h-52 overflow-y-auto">
                       <div>
                        <h2 className="text-slate-300 font-semibold">BPM</h2>
                        <p className="hover:bg-gray-100 text-md" onClick={()=>{
                            setIndustry("Analyticc/KPO/Research")
                            setShowIndus(false);
                        }}>Analyticc/KPO/Research</p>
                        <p className="hover:bg-gray-100 text-md mt-2" onClick={()=>{
                            setIndustry("BPM/BPO")
                            setShowIndus(false);
                        }}>BPM/BPO</p>
                       </div>

                        <div>
                        <h2 className="text-slate-300 font-semibold">IT Services</h2>
                        <p className="hover:bg-gray-100 text-md mt-2" onClick={()=>{
                            setIndustry("IT Services & Consulting")
                            setShowIndus(false);
                        }}>IT Services & Consulting</p>
                       </div>
                    </div>
                    }
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-medium">Department <sup className="text-red-500">*</sup></span>
                    <input type="text" value={department} onClick={()=> setShowDepartment(prev => !prev)} placeholder="Select your department/area of expertise" className="w-full cursor-pointer placeholder-slate-500 text-sm p-3 rounded-2xl border border-gray-400 outline-0" />


                    {
                        showDepartment && 
                        <div className="absolute z-10 p-2 w-[600px]  flex flex-col bg-white  rounded-md mt-20 shadow-lg max-h-52 overflow-y-auto">
                      {
                        Departments.map(each => {
                            return <p onClick={()=> {
                                setDepartment(each)
                                setShowDepartment(false)
                            }} className="hover:bg-gray-100 text-slate-500 text-md p-1 cursor-pointer">{each}</p>
                        })
                      }
                    </div>
                    }
                </div>


{/* Desired job type */}

                <div className="flex flex-col gap-2">
                    <span className="font-medium">Desired job type</span>
                    <div className="max-w-2xl flex gap-20 items-center">
                        {/* permanent */}
                        <div className="flex gap-2 items-center">
                            <input checked={jobType.includes("Permanent")} onChange={()=> handleCheckJobType("Permanent")}  type="checkbox" className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Permanent</span>
                        </div>
                        {/* contractual */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={jobType.includes("Contractual")} onChange={()=> handleCheckJobType("Contractual")} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Contractual</span>
                        </div>
                    </div>
                </div>

{/* Desired employment type */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Desired employment type</span>
                    <div className="max-w-2xl flex gap-23 items-center">
                        {/* permanent */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" onChange={()=> handleCheckEmploymentType("Full time")} checked={employmentType.includes("Full time")} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Full time</span>
                        </div>
                        {/* contractual */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" onChange={()=> handleCheckEmploymentType("Part time")} checked={employmentType.includes("Part time")} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Part time</span>
                        </div>
                    </div>
                </div>

{/* Preferred shift */}
                <div className="flex flex-col gap-2">
                    <span className="font-medium">Preferred shift</span>
                    <div className="max-w-2xl flex gap-31 items-center">
                        {/* permanent */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={shiftType==='Day'} onChange={()=> setShift('Day')} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Day</span>
                        </div>
                        {/* contractual */}
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={shiftType==='Night'} onChange={()=> setShift('Night')} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Night</span>
                        </div>

                          <div className="flex gap-2 items-center">
                            <input type="checkbox" checked={shiftType==='Flexible'} onChange={()=> setShift('Flexible')} className="accent-black w-4 h-4  transition-all duration-300" />
                            <span className="text-slate-500">Flexible</span>
                          </div>
                    </div>
                </div>


            {/* Preferred work location (Max 10) */}

            <div className="flex flex-col gap-2">
                <p className="font-medium">Preferred work location (Max 10)</p>
                <input onClick={()=> setShowList(prev => !prev)}  type="text" placeholder="Tell us your location preferences to work" className="w-full p-3 rounded-2xl cursor-pointer border text-sm border-gray-400 placeholder-slate-500 outline-0" />

                {showList && (
                        <div className="absolute z-10 no-scrollbar w-[600px] bg-white border border-gray-200 rounded-md mt-20 shadow-md max-h-52 overflow-y-auto">
                        <div className="px-3 py-2 text-sm font-semibold text-gray-600 border-b">
                            Popular locations
                        </div>

                        {cities.map((city) => (
                            <label
                            key={city}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-0"
                            >
                            <input
                                type="checkbox"
                                checked={preferredLocations.includes(city)}
                                onChange={() => HandleSelect(city)}
                                className="accent-black w-4 h-4  transition-all duration-300"
                            />
                            <span className="text-gray-800">{city}</span>
                            </label>
                        ))}

                       
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                    {
                    preferredLocations.map((each:any)=>{
                        return <span className="rounded-full flex items-center gap-2 border text-sm text-slate-500 border-gray-400 px-5 py-1">{each}<IoMdClose
                        onClick={()=> HandleSelect(each)}
                        className="text-lg text-black cursor-pointer"/></span>
                    })
                    }
                    </div>
                
            </div>

{/* Expected salary */}

            <div className="flex flex-col gap-2">
                <span className="font-medium">Expected Salary</span>
                <div className="flex items-center gap-3">
                    <select className="text-slate-500 w-[20%] rounded-2xl outline-0 border border-gray-400 p-3" name="" id="">
                        <option value="">₹</option>
                        <option value="rupee">₹</option>
                        <option value="dolar">$</option>
                    </select>

                    <input type="text" className="w-[80%] rounded-2xl outline-0 border border-gray-400 p-3" />
                </div>
            </div>

            
{/* cancel and save button */}

                <div className="flex justify-center items-center gap-7 mt-5">
                    <span onClick={onClose} className="text-blue-500 cursor-pointer">Cancel</span>
                    <span className="px-4 cursor-pointer hover:bg-blue-400 py-2 bg-blue-500 text-white rounded-full font-medium">Save</span>
                </div>


         </div>
    </div>
   )
}


interface Experience{
    years:string;
    months:string
}
function IT_Skills({onClose,rowId}:any){

    console.log("RowId" + rowId)
    const[showlastUsed,setShowLastUsed] = useState(false);
    const[showexperience,setShowExperience] = useState(false);
    const[showmonths,setShowMonth] = useState(false);
 

    const [skill,setSkill] = useState("");
    const [softwareVersion,setVersion] = useState('');
    const [lastUsed,setLastused] = useState('');
    const [loading,setLoading] = useState(false);
    const [msg,setMsg] = useState('');
    const [experience,setExperience] = useState<Experience>({
        years:"",
        months:''
    }); 
    

    async function PostIT_skills(e:any){
        e.preventDefault();
        setLoading(true);
        try{
           const PostingRes = await axios({
            url:'https://jobportalbackend-whpt.onrender.com/user/IT_Skills',
            data:{
               skill:skill,
               lastused:String(lastUsed),
               version:softwareVersion,
               expYears:experience.years,
               expMonths:experience.months,
               rowId:rowId

            },
            method:'POST',
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
           })

           if(PostingRes.data && PostingRes.data.msg){
               setMsg(PostingRes.data.msg);
               setTimeout(()=>{
                  onClose()
               },6000)
           }
        }
        catch(err){
            console.log(err)
        }
    }
    

   

    return (
        <div className="fixed   inset-0 flex font-aman items-center justify-center bg-black/80  z-50">
           <div className="bg-white no-scrollbar zoom-in max-h-[600px] overflow-y-auto rounded-4xl flex flex-col gap-5 shadow-md p-8 max-w-2xl mx-auto">
                
                 <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


       <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          IT skills <span className="text-green-300 text-md font-normal">Add 10%</span>
        </h1>
        <p className="text-gray-500 font-medium text-sm">
          Mention skills like programming languages (Java, Python), softwares (Microsoft Word, Excel) and more, to show your technical expertise.
        </p>
      </div>

      <form>
        {/* Skill Card */}
        <div className="mb-3 p-6  rounded-lg">
          {/* Skill Name Section */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill / software name<span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e)=> setSkill(e.target.value)}
              type="text"
              placeholder="Skill / Software name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 my-6"></div>

          {/* Software Version and Last Used */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Software version
              </label>
              <input
               onChange={(e)=> setVersion(e.target.value)}
                type="text"
                placeholder="Software version"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last used
              </label>
              <input
              value={lastUsed}
            onClick={()=> setShowLastUsed(prev => !prev)}
                
                placeholder="Last used"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent caret-transparent cursor-pointer outline-0 transition-all duration-200"
              />

              {showlastUsed && <DropDownList setShow={setShowLastUsed} setState={setLastused} content={'LastUsed'}/>}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Experience
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Years</label>
                <input
                value={experience.years}
                  onClick={()=> setShowExperience(prev => !prev)}
                  
                  placeholder="0"
                  min="0"
                  max="50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 caret-transparent cursor-pointer outline-0 focus:border-transparent transition-all duration-200"
                />
                {showexperience && <DropDownList setShow={setShowExperience} setState={setExperience} content={'Experience'}/>}
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Months</label>
                <input
                
                value={experience.months}
                  onClick={()=> setShowMonth(prev => !prev)}
                  
                  placeholder="0"
                  min="0"
                  max="11"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 caret-transparent cursor-pointer outline-0 focus:border-transparent transition-all duration-200"
                />
                {showmonths && <DropDownList setShow={setShowMonth} setState={setExperience} content={'Months'}/>}

              </div>
            </div>

            <div className="flex mt-4 justify-center text-green-400 animate-pulse">
                {msg}
            </div>
            
          </div>
        </div>

        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
          onClick={onClose}
            type="button"
            className="px-6 py-3 cursor-pointer text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={PostIT_skills}
            disabled={!skill}
            type="submit"
            className={`px-6 py-3  text-white font-medium rounded-lg transition-colors duration-200 ${!skill ? 'bg-gray-500 cursor-not-allowed':'hover:bg-blue-700 bg-blue-600'} shadow-sm`}
          >
            {loading ? <Spinner/>:"Save"}
          </button>
        </div>
      </form>




           </div>
        </div>
    )
}

function DropDownList({content,setState,setShow}:any){

     const Years = Array.from({ length: 59 }, (_, i) => 2025-i);
    const experinceYears = Array.from({ length: 31 }, (_, i) => i);
    const Months = Array.from({length:12},(_, i) => i)

    
    return <div className="absolute z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md mt-3 shadow-md max-h-52 overflow-y-auto">
                        
                     {content==="LastUsed" &&  <div className="flex flex-col">
                            {
                              Years.map((each:any)=>{
                                return <span onClick={()=>{
                                    setState(each)
                                    setShow(false)
                                }} className="text-md p-1 hover:bg-gray-100 font-medium">
                                    {each}
                                </span>
                              })
                            }
                        </div>}
                       
                        {content==="Experience" &&  <div className="flex flex-col">
                            {
                              experinceYears.map((each:any)=>{
                                return <span onClick={()=>{
                                    setState((prev:any) => ({...prev,years:`${each} Years`}))
                                    setShow(false)
                                }} className="text-md hover:bg-gray-100 font-medium">
                                    {each} Years
                                </span>
                              })
                            }
                        </div>}

                         {content==="Months" &&  <div className="flex flex-col">
                            {
                              Months.map((each:any)=>{
                                return <span onClick={()=>{
                                    setState((prev:any) => ({...prev,months:`${each} Months`}))
                                    setShow(false)
                                }} className="text-md hover:bg-gray-100 font-medium">
                                    {each} Months
                                </span>
                              })
                            }
                        </div>}

                       

                       
                        </div>

}



interface Joining{
    years:Boolean;
    months:Boolean
}




function Employement_PopUp({onClose}:any){

   

    const years = Array.from({length:54},(_,i)=> 2025-i);
    const months = Array.from({length:12},(_,i)=> i);
    const monthsShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const noticePeriodOptions = [
        "15 Days or less",
        "1 Month",
        "2 Months",
        "3 Months",
        "More than 3 Months",
        "Serving Notice Period"
    ];

    const expYears = Array.from({length:31},(_,i)=> i)


const [showJoining,setJoining] = useState<Joining>({
    years:false,
    months:false
});
const [showTill,setTill] = useState<Joining>({
    years:false,
    months:false
})
const [showExp,setShowExp] = useState<Joining>({
    years:false,
    months:false
})
const [showNotice,setShowNotice] = useState(false)


//    Data recording

    const [currentEmployment,setCurrentEmployment] = useState(true);
    const [employmentType,setEmploymentType] = useState('Full-time');

    const [totalExp,setTotalExp] = useState({
        years:"",
        months:""
    })
    const [joiningDate,setJoiningDate] = useState({
        years:"",
        months:""
    })
    const [tillDate,setTillDate] = useState({
        years:"",
        months:""
    })

    const [companyName,setCompany] = useState('');
    const [jobTitle,setJobTitle] = useState('');
    const [skills,setSkills] = useState<String[]>([]);
    const [eachSkill,setEachskill]  = useState('');
    const [profile,setProfile] = useState('');
    const [salary,setSalary] = useState('');
    const [location,setLocation] = useState('');
    const [department,setDepartment] = useState('');
    
    const [notice,setNotice] = useState('');


    function handleSkillArr(each:any){

        const eachNew = each.trim();
        if(eachNew===''){
            return ;
        }

        for(let i=0;i<skills.length;i++){
            if(skills[i]===eachNew){
                return ;
            }
        }

        setSkills(prev => ([...prev,eachNew]));

    

    }

    function handleRemoveSkill(each:any){
        setSkills(prev => prev.filter(eachVal => eachVal!==each));
    }
    function handleJobProfile(each:any){
        const profile = each.trim();

        if(!profile) return ;
        setProfile(profile); 
    }

    const [loading,setLoading] = useState(false);


    async function PostingEmployment(){
        setLoading(true)
        try{
             const posting  = await axios({
                url:'https://jobportalbackend-whpt.onrender.com/user/postEmployment',
                method:'POST',
                data:{
                    salary,
                    totalExp,
                    joiningDate,
                    tillDate,
                    profile,
                    department,
                    companyName,
                    jobTitle,
                    notice,
                    skills
                }
                ,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
             })

             if(posting.data && posting.data.ok){
                onClose();
             }

        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }

    }



    

    return (
        <div className="fixed  inset-0 flex font-aman items-center justify-center bg-black/80 z-50">

            <div className="bg-white no-scrollbar zoom-in max-h-[660px] overflow-y-auto rounded-4xl flex flex-col gap-9 shadow-md p-8 max-w-3xl mx-auto w-[660px]">


                <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-medium">Employment</h1>
                    <p className="text-sm font-medium text-slate-500">Details like job title, company name, etc, help employers understand your work</p>
                </div>


 {/* current employement */}
                <div className="flex flex-col gap-1">
                      <h1 className="font-medium">Is this your current employment?</h1>

                      <div className="flex gap-6">
                        <div className="flex items-center gap-2"><input checked={currentEmployment===true} onChange={()=> setCurrentEmployment(true)} className="accent-black h-4 w-4 " type="radio" /> Yes</div>
                        <div className="flex items-center gap-2"><input checked={currentEmployment===false} type="radio" onChange={()=> setCurrentEmployment(false)} className="accent-black h-4 w-4"/> No</div>
                      </div>
                </div>
                {/* employment type */}

                <div className="flex flex-col gap-2">
                     <h1 className="font-medium">Employement type</h1>

                      <div className="flex gap-6">
                        <div className="flex items-center gap-2"><input onChange={()=> setEmploymentType('Full-time')} checked={employmentType==='Full-time'} className="accent-black h-4 w-4 " type="radio"  /> Full-time</div>
                        <div className="flex items-center gap-2"><input onChange={()=> setEmploymentType('Internship')} checked={employmentType==='Internship'} className="accent-black h-4 w-4 " type="radio"  /> Internship</div>
                      </div>

                </div>

                <form onSubmit={(e)=>{
                             e.preventDefault()
                             PostingEmployment()
                        }} action="" className="flex flex-col gap-8"> 

                {/* Total experience */}

                {(employmentType==='Full-time' && currentEmployment) &&  <div>
                    <h1 className="font-medium">
                        Total experience <sup className="text-red-500">*</sup>
                    </h1>

                    <div className="w-full gap-3 flex">

                        <input required value={totalExp.years} type="text" placeholder="Years" onClick={()=> setShowExp(prev => ({...prev,years:prev.years ? false:true}))} className="caret-transparent rounded-2xl border w-[50%] border-gray-400 outline-0 p-2" />
                        <input required value={totalExp.months} type="text"  onClick={()=> setShowExp(prev => ({...prev,months:prev.months ? false:true}))} placeholder="Months" className="caret-transparent rounded-2xl border w-[50%] border-gray-400 outline-0 p-2" />
                    </div>


                    {/* show drop down list */}

                     {showExp.years && <div className="absolute z-100 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-2 shadow-md flex flex-col max-h-52 overflow-y-auto">

                        {
                            expYears.map((each:any)=>{
                                return <span onClick={()=> {
                                    setTotalExp(prev => ({...prev,years:each}))
                                    setShowExp(prev => ({...prev,years:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each} {each<10 ? "Year":each===30 ? '+ Years':"Years"}</span>
                            })
                        }



                    </div>
                    }

                     {showExp.months && <div className="absolute flex flex-col z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md right-10 mt-2 shadow-md max-h-52 overflow-y-auto">

                        {
                            months.map((each:any)=>{
                                return <span onClick={()=> {
                                    setTotalExp(prev => ({...prev,months:each}))
                                    setShowExp(prev => ({...prev,months:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each} Months</span>
                            })
                        }



                    </div>
                    }





                </div> }
               


                {/* Current company name */}

                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">{currentEmployment ? 'Current':'Previous'} company name <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> setCompany(e.target.value)} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>

                {/* Location  */}

            {employmentType==='Internship' &&  
            
                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">Location <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> 
                        {
                            const newLocation = e.target.value.trim();
                            setLocation(newLocation)
                        }} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>}



                {/* Department */}

                {employmentType==='Internship' && <div className="flex flex-col gap-1">
                    
                    <h1  className="font-medium">Department <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> setDepartment(e.target.value)} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>}


                 
                 {employmentType==='Full-time'  &&  
                 

                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">{currentEmployment ? 'Current':'Previous'} job title <sup className="text-red-500">*</sup></h1>
                    <input required type="text" onChange={(e)=> {
                        const newJobTitle = e.target.value.trim();
                        setJobTitle(newJobTitle);
                    }} className="rounded-2xl p-2 border border-gray-400 outline-0" />

                </div>
}
                {/* Joining date */}

                <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">Joining date <sup className="text-red-500">*</sup></h1>

                    <div className="flex gap-2 w-full" >
                        <input required value={joiningDate.years} type="text" onClick={()=> setJoining(prev => ({...prev,years:prev.years ? false:true}))} placeholder="Select year" className="rounded-2xl cursor-pointer caret-transparent p-2 w-[50%] border border-gray-400 outline-0" />
                        <input required value={joiningDate.months} type="text" onClick={()=> setJoining(prev => ({...prev,months:prev.months ? false:true}))} placeholder="Select Month" className="rounded-2xl cursor-pointer caret-transparent p-2 border w-[50%] border-gray-400 outline-0" />
                    </div>


                    {/* Drop down list */}


                   {showJoining.years && <div className="absolute z-100 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-19 shadow-md flex flex-col max-h-52 overflow-y-auto">

                        {
                            years.map((each:any)=>{
                                return <span onClick={()=> {
                                    setJoiningDate(prev => ({...prev,years:each}))
                                    setJoining(prev => ({...prev,years:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }

                     {showJoining.months && <div className="absolute flex flex-col z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md right-10 mt-19 shadow-md max-h-52 overflow-y-auto">

                        {
                            monthsShort.map((each:any)=>{
                                return <span onClick={()=> {
                                    setJoiningDate(prev => ({...prev,months:each}))
                                    setJoining(prev => ({...prev,months:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }
                    

                    

                </div>

                {/* Till date */}

               {!currentEmployment && <div className="flex flex-col gap-1">
                    
                    <h1 className="font-medium">Till date <sup className="text-red-500">*</sup></h1>

                    <div className="flex gap-2 w-full" >
                        <input required value={tillDate.years} type="text" placeholder="Select year" onClick={()=> setTill(prev => ({...prev,years:prev.years ? false:true}))} className="rounded-2xl caret-transparent cursor-pointer p-2 w-[50%] border border-gray-400 outline-0" />
                        <input required value={tillDate.months}  type="text" placeholder="Select Month" onClick={()=> setTill(prev => ({...prev,months:prev.years ? false:true}))} className="rounded-2xl caret-transparent cursor-pointer p-2 border w-[50%] border-gray-400 outline-0" />
                    </div>

                   {/* drop down list */}

                      {showTill.years && <div className="absolute z-100 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-19 shadow-md flex flex-col max-h-52 overflow-y-auto">

                        {
                            years.map((each:any)=>{
                                return <span onClick={()=> {
                                    setTillDate(prev => ({...prev,years:each}));
                                    setTill(prev => ({...prev,years:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }

                     {showTill.months && <div className="absolute flex flex-col z-100 no-scrollbar w-[270px] p-4 bg-white border border-gray-200 rounded-md right-10 mt-19 shadow-md max-h-52 overflow-y-auto">

                        {
                            monthsShort.map((each:any)=>{
                                return <span onClick={()=>{
                                    setTillDate(prev => ({...prev,months:each}));
                                     setTill(prev => ({...prev,months:false}))
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }



                    </div>
                    }
                    

                </div>}

                

                {/* current salary */}

                <div>
                    <h1 className="font-medium">
                        {employmentType==='Intership' ? 'Monthly stipend':'Salary'} <sup className="text-red-500">*</sup>
                    </h1>

                    <div className="w-full flex gap-2">
                        <input type="text" className="w-[13%] rounded-lg p-2 border border-gray-400 outline-0" placeholder="" />
                        <input required type="number" onChange={(e)=> {
                            const salary = e.target.value.trim();
                            setSalary(salary)
                        }}  className="w-[87%] rounded-lg p-2 border border-gray-400 outline-0"/>
                    </div>
                </div>


          
{/* Skills used */}

               {employmentType==='Full-time' && currentEmployment &&  <div className="flex flex-col gap-3">
                    
                    <h1 className="font-medium">Skills used <sup className="text-red-500">*</sup></h1>

                    <div className="flex flex-wrap gap-2">
                        {
                            skills.map((each:any)=>{
                                return <span className="flex gap-1 rounded-full px-3 py-1 items-center border border-gray-400 bg-gray-100">
                                     {each} <IoMdClose onClick={()=> handleRemoveSkill(each)} className="cursor-pointer text-slate-500 text-lg"/>
                                </span>
                            })
                        }
                    </div>
                    <input type="text" onChange={(e)=> setEachskill(e.target.value)} placeholder="Add skills" className="rounded-2xl p-2 border border-gray-400 outline-0" />

                    <button disabled={!eachSkill} onClick={()=> handleSkillArr(eachSkill)} className={`rounded-full  p-1 ${eachSkill ? 'bg-blue-500 text-white cursor-pointer  font-medium':'bg-gray-100 text-slate-400 cursor-not-allowed'}`}>Add</button>

                </div>}


                {/* Job profile */}

                <div className="flex flex-col gap-3">
            <h1 className="font-medium">Job Profile</h1>
            <textarea 
                onChange={(e)=> handleJobProfile(e.target.value)}
                placeholder="Type here..." 
                className="rounded-2xl  outline-0 border border-gray-300 p-4 h-40 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 shadow-sm"
            ></textarea>
                </div>


                      {/* Notice period */}
                    {employmentType==='Full-time' && currentEmployment  && <div className="w-full">
                        <h1 className="font-medium">Notice period <sup 
                        className="text-red-500">*</sup></h1>
 
                        <input required type="text" value={notice} placeholder="Select Notice period" onClick={()=> setShowNotice(prev => !prev)} className="rounded-2xl w-full p-2 border border-gray-400 outline-0 caret-transparent" />



                        {/* drop down list */}

                       {showNotice &&  <div className="absolute z-50 no-scrollbar w-[270px] p-2 bg-white border border-gray-200 rounded-md mt-2 shadow-md flex flex-col max-h-52 overflow-y-auto">


                            {
                            noticePeriodOptions.map((each:any)=>{
                                return <span onClick={()=> {
                                    setNotice(each);
                                    setShowNotice(false)
                                }} className="text-sm font-medium hover:bg-gray-100 p-2">{each}</span>
                            })
                        }




                        </div>

                        }
                        
                      </div>}
                      



                      {/* Save and close  */}

                      <div className="flex justify-end gap-4">
                        <button onClick={onClose} className="text-blue-500 cursor-pointer">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 rounded-2xl cursor-pointer py-2 font-medium">{loading ? <Spinner/>:'Save'}</button>
                      </div>
                </form>



            </div>


        </div>
    )
}


function EducationDiv({onClose,preObject}:any){
  console.log("prev" + preObject.rowId)
    
    const Starting = Array.from({length:56},(_,i) => 2025-i);
    const Ending = Array.from({length:61},(_,i) => 2030-i);



    // 🎓 Graduation (Undergraduate) Courses
const graduationCourses = [
  "B.Tech / B.E.",
  "B.Sc (Computer Science)",
  "B.Sc (Physics)",
  "B.Sc (Mathematics)",
  "B.Sc (Biotechnology)",
  "B.Com (General)",
  "B.Com (Honours)",
  "BBA (Bachelor of Business Administration)",
  "BA (Economics)",
  "BA (English Literature)",
  "BA (Political Science)",
  "BA (Psychology)",
  "BCA (Bachelor of Computer Applications)",
  "B.Arch (Architecture)",
  "B.Des (Design)",
  "B.Pharm (Pharmacy)",
  "B.Ed (Education)",
  "LLB (Law)",
  "BFA (Fine Arts)",
  "BHM (Hotel Management)",
  "BMS (Management Studies)"
];

// 🎓 Post Graduation (Masters) Courses
const mastersCourses = [
  "M.Tech / M.E.",
  "M.Sc (Computer Science)",
  "M.Sc (Mathematics)",
  "M.Sc (Physics)",
  "M.Sc (Biotechnology)",
  "M.Com (Commerce)",
  "MBA (Master of Business Administration)",
  "MA (Economics)",
  "MA (English Literature)",
  "MA (Psychology)",
  "MCA (Master of Computer Applications)",
  "M.Arch (Architecture)",
  "M.Des (Design)",
  "M.Pharm (Pharmacy)",
  "M.Ed (Education)",
  "LLM (Master of Laws)",
  "MFA (Fine Arts)",
  "MPA (Public Administration)",
  "MSW (Social Work)",
  "M.Sc (Data Science)"
];

const DoctorteCourses = [
    'Ph.D/Doctorate',
    'MPHIL',
    'Other Doctorate'
]

const SchoolBoards = [
    "CBSE (Central Board of Secondary Education)",
  "CISCE (Council for the Indian School Certificate Examinations - ICSE/ISC)",
  "NIOS (National Institute of Open Schooling)",
  "IB (International Baccalaureate)",
  "Cambridge (CIE - Cambridge International Examinations)",
   "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]
const schoolMediums = [
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Bengali",
  "Punjabi",
  "Urdu",
  "Sanskrit",
  "Assamese",
  "Odia",
  "Konkani",
  "Manipuri",
  "Nepali",
  "Sindhi",
  "Bodo",
  "Other"
];



    const [education,setEducation] = useState('Doctorate/PhD');
    const [courseType,setCourseType] = useState('Full time')
    const [gradingSystem,setGrading] = useState('');
    const [marks,setMarks] = useState('')
    const [board,setBoard] = useState('')
    const [passout,setPassout] = useState('')
    const [medium,setMedium] = useState('')
    const [course,setCourse] = useState('')
    const [university,setUnivsersity] = useState('');
    const [msg,setMsg] = useState('')
    const [duration,setDuration] = useState({
        starting:'',
        ending:''
    })

    const [loading,setLoading] = useState(false)

    async function PostingEducation(){
        setLoading(true)
        try{
            const posting = await axios({
                url:'https://jobportalbackend-whpt.onrender.com/user/postEducation',
                method:'POST',
                 data:{
                     education:(preObject.education ? preObject.education : education),
                     university,
                     passout,
                     medium,
                     duration,
                     board,
                     gradingSystem,
                     courseType,
                     marks,
                     course,
                     preObject
                     ,
                     rowId:preObject.rowId ? preObject.rowId:"" 


                 }
                ,
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(posting.data && posting.data.msg){
                setMsg(posting.data.msg)
            }
            if(posting.data && posting.data.ok){
                onClose();
            }
        }
        catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        setEducation(preObject.education || "Doctorate/PhD")
    },[preObject])


    return (

        <div className="fixed  inset-0 flex font-aman items-center justify-center bg-black/80 z-50">
            <div className="bg-white no-scrollbar zoom-in max-h-[660px] overflow-y-auto rounded-4xl flex flex-col gap-9 shadow-md p-8 max-w-3xl mx-auto w-[660px]">

                 <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>


                {/* Education */}

                 <form onSubmit={(e)=>{
                    e.preventDefault()
                    PostingEducation()
                 }} className="flex flex-col gap-6">
        {/* Education */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Education <span className="text-red-500">*</span>
          </label>
          <select  disabled={!!(preObject && preObject.education && preObject.rowId)}
 value={preObject?.education ? preObject?.education:education} onChange={(e)=> setEducation(e.target.value)} className="w-full border border-gray-300 caret-transparent  rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
            <option className="" value="Doctorate/PhD">Doctorate/PhD</option>
            <option className="" value="Masters/Post-Graduation">Masters/Post-Graduation</option>
            <option className="" value="Graduation/Diploma">Graduation/Diploma</option>
            <option className="" value="12th">12th</option>
            <option className="" value="10th">10th</option>
            <option className="" value="Below 10th">Below 10th</option>

          </select>
        </div>

        
        {['Doctorate/PhD','Masters/Post-Graduation','Graduation/Diploma'].includes(education) && 
        

        <div className="flex flex-col gap-8 mt-3">
    <div>
          <label className="block text-sm font-medium mb-1">
            University/Institute <span className="text-red-500">*</span>
          </label>
          <input
          value={university}
          required
          onChange={(e)=> setUnivsersity(e.target.value)}
            type="text"
            placeholder="Select university/institute"
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">
            Course <span className="text-red-500">*</span>
          </label>
          <select value={course} onChange={(e)=> setCourse(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500 mb-2">
            <option value={''} hidden></option>

           {education==='Doctorate/PhD' && 
           DoctorteCourses.map(each=> {
            return <option value={each} key={each}>
                  {each}
            </option>
           })
           }

           {education==='Masters/Post-Graduation' &&
            mastersCourses.map(each=> {
                return <option value={each} key={each}>
                    {each}
                </option>
            })
           }
           {education==='Graduation/Diploma' &&
            graduationCourses.map(each=> {
                return <option value={each} key={each}>
                    {each}
                </option>
            })
           }


          </select>
        
        </div>

       

       
        <div>
          <label className="block text-sm font-medium mb-2">
            Course type <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-10">
            <label className="flex items-center gap-2">
              <input checked={courseType==='Full time'} onClick={()=> setCourseType('Full time')} type="radio" name="type" className="accent-blue-500 h-4 w-4" />
              <span>Full time</span>
            </label>
            <label className="flex items-center gap-2">
              <input checked={courseType==='Part time'} onClick={()=> setCourseType('Part time')} type="radio" name="type" className="accent-blue-500 h-4 w-4" />
              <span>Part time</span>
            </label>
            <label className="flex items-center gap-2">
              <input checked={courseType==='Correspondence/Distance learning'}  onClick={()=> setCourseType('Correspondence/Distance learning')} type="radio" name="type" className="accent-blue-500 h-4 w-4" />
              <span>Correspondence/Distance learning</span>
            </label>
          </div>
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">
            Course duration <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <select required value={duration.starting} onChange={(e)=> setDuration(prev => ({...prev,starting:e.target.value}))} className="w-1/2 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" hidden></option>
              {
                Starting.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
              }
            </select>
            <span className="text-gray-600">To</span>
            <select required value={duration.ending} onChange={(e)=> setDuration(prev => ({...prev,ending:e.target.value}))} className="w-1/2 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
              {
                Ending.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
              }
            </select>
          </div>
        </div>

       
        <div>
          <label className="block text-sm font-medium mb-1">Grading system</label>
          <select required value={gradingSystem} onChange={(e)=> setGrading(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
            <option value="Scale 10 grading system">Scale 10 grading system</option>
            <option value="Scale 4 grading system">Scale 4 grading system</option>
            <option value="% Marks of 100 Maximum">% Marks of 100 Maximum</option>
            <option value="Course Requires a Pass">Course Requires a Pass</option>
          </select>

        {gradingSystem!=='Course Requires a Pass' && <div className="mt-5">
          <label htmlFor="marks">Marks <sup className='text-red-500'>*</sup></label>
          <input required  className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=> setMarks(e.target.value)} type="text" id="marks" />
        </div>
        }
          
        </div>

        </div>
        
        }

        {!['Doctorate/PhD','Masters/Post-Graduation','Graduation/Diploma','Below 10th'].includes(education) &&

        <div className="flex flex-col gap-8 mt-3">

            <div>
          <label className="block text-sm font-medium mb-1">
            Board <span className="text-red-500">*</span>
          </label>
          <select required value={board} onChange={(e)=> setBoard(e.target.value)} className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value={''} hidden></option>
            {
                SchoolBoards.map(each=> {
                    return <option value={each} key={each}>{each}</option>
                })
            }
          </select>
        </div>

        {/* Passing out year */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Passing out year <span className="text-red-500">*</span>
          </label>
          <select required value={passout} onChange={(e)=> setPassout(e.target.value)} className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="" hidden></option>
            {
                Starting.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
            }
          </select>
        </div>

        {/* School medium */}
        <div>
          <label className="block text-sm font-medium mb-1">
            School medium <span className="text-red-500">*</span>
          </label>
          <select required value={medium} onChange={(e)=> setMedium(e.target.value)} className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-1 focus:ring-blue-500">
            <option value="" hidden></option>
            {
                schoolMediums.map(each=>{
                    return <option value={each} key={each}>{each}</option>
                })
            }
          </select>
        </div>

        {/* Marks */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Marks <span className="text-red-500">*</span>
          </label>
          <input
          required
          onChange={(e)=> setMarks(e.target.value)}
            type="text"
            placeholder="% marks of 100 maximum"
            className="w-full border border-gray-300 rounded-full p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
 
        </div>

        }
        
        {/* Buttons */}
        <div className="flex mt-3 justify-end gap-4">
          <button
          onClick={onClose}
            type="submit"
            className="text-blue-600 hover:underline font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {loading ? <Spinner/>:'Save'}
          </button>
        </div>



      </form>


      <div className="text-red-500 font-medium flex justify-center">
        {msg}
      </div>






            </div>
        </div>
    )

}

function ProjectDiv({onClose}:any){

  const [title,setTitle] = useState('');
  const [client,setClient] = useState("");
  const [skillsused,setSkills] = useState<String[]>([]);
  const [skill,setSkill] = useState('')
  const [status,setStatus] = useState('Inprogress');
  const [loading,setLoading] = useState(false)
  const [workedFrom,setWorkedFrom] = useState({
    years:"",
    months:""
  })
  const [description,setDesc] = useState('');


  const Years = Array.from({length:50},(_,i)=> 2025-i);
   const monthsShort = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
   ];

   const Characters = 1000;


   async function HandlePosting(){
    setLoading(true)
    try{
           const Data = await axios({
            url:'https://jobportalbackend-whpt.onrender.com/user/postProjects',
            data:{
              status,
              description,
              workedFrom,
              title,
              client,
              skillsused
            },
            method:"POST",
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
           })

           if(Data.data && Data.data.ok){
            onClose()
           }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
   }

   function handleAddSkill(each:any){
     const Trimed = each.trim();
     const If_Exist = skillsused.some(eachSkill => eachSkill===Trimed);
     if(!If_Exist && Trimed!=''){
          setSkills(prev => ([...prev,Trimed]))
     }
   }

   function handleRemoveSkill(each:any){
     const Trimed = each.trim();
     setSkills(prev => prev.filter(e => e!==Trimed))
   }



    return (
        <div className="fixed  inset-0 flex font-aman items-center justify-center bg-black/80 z-50">

            <div className="bg-white no-scrollbar zoom-in max-h-[660px] overflow-y-auto rounded-4xl flex flex-col gap-9 shadow-md p-8 max-w-3xl mx-auto w-[660px]">
 



                <div className="flex justify-end items-center">
                    <IoMdClose onClick={onClose} className="text-xl cursor-pointer hover:text-slate-500"/>
                </div>

                  
                       <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project</h2>
      <p className="text-gray-500 mb-6">
        Stand out for employers by adding details about projects you have done
        in college, internships, or at work
      </p>

      <form onSubmit={(e)=>{
        e.preventDefault()
        HandlePosting()
        }} action="" className="flex flex-col gap-6">
                {/* Project title */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project title <span className="text-red-500">*</span>
        </label>
        <input
        onChange={(e)=> setTitle(e.target.value)}
          required
          type="text"
          placeholder="Enter project title"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

    

      {/* Client */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e)=> setClient(e.target.value)}
          required
          type="text"
          placeholder="Enter client name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

       {/* Skillused */}
      <div className="mb-5 flex flex-col gap-3 items-start">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skills Used 
        </label>
        <div className="flex flex-wrap gap-2">

          {
            skillsused.map(each => {
               return <span className="px-3 py-1 flex gap-1 items-center bg-gray-100 rounded-full border border-gray-400">
                {each} <IoMdClose className='text-slate-500 cursor-pointer' onClick={()=> handleRemoveSkill(each)}/>
               </span>
            })
          }
        </div>
        <input
          onChange={(e)=> setSkill(e.target.value)}
          type="text"
          
          placeholder="Enter skill you used"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span onClick={()=> handleAddSkill(skill)} className="px-4 py-1 bg-purple-500 text-white rounded-full mt-2 cursor-pointer hover:bg-purple-400">Add</span>
      </div>

      {/* Project status */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project status
        </label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input onChange={()=> setStatus('Inprogress')} checked={status==='Inprogress'} type="radio" name="status" className="accent-black w-4 h-4" />
            <span>In progress</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input onChange={()=> setStatus('Finished')} checked={status==='Finished'} type="radio" name="status" className="accent-black w-4 h-4" />
            <span>Finished</span>
          </label>
        </div>
      </div>

      {/* Worked from */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Worked from <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-3">
          <select
          required
          onChange={(e)=> setWorkedFrom(prev => ({...prev,years:e.target.value}))} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
            <option hidden value="">Select Year</option>
            {
              Years.map(each=>{
                return <option key={each} value={each}>
                  {each}
                </option>
              })
            }
          </select>
          <select
          required
          onChange={(e)=> setWorkedFrom(prev => ({...prev,months:e.target.value}))} className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
            <option hidden value="">Select month</option>
            {
              monthsShort.map(each=>{
                return <option key={each} value={each}>
                  {each}
                </option>
              })
            }
          </select>
        </div>
      </div>

      {/* Details */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Details of project <span className="text-red-500">*</span>
        </label>
        <textarea
          
          onChange={(e)=> setDesc(e.target.value)}
          placeholder="Type here..."
          maxLength={Characters}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <p
    className={`text-right text-xs mt-1 ${
      Characters - description.length === 0 ? "text-red-500" : "text-gray-500"
    }`}
  >
    {Characters - description.length} character(s) left
  </p>
      </div>

      {/* Add more / Save */}
      <div className="flex justify-end items-center">
      
        <div className="space-x-4">
          <button className="text-gray-600 font-medium hover:underline">
            Cancel
          </button>
          <button type='submit' className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            {loading ? <Spinner/>:'Save'}
          </button>
        </div>
      </div>

      </form>

    

            </div>
             
        
        </div>
    )
}















