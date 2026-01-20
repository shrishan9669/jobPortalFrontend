import React, { useEffect, useRef, useState } from 'react';
import { For_EmployersDiv, Job_Hover_Div } from './header';
import { useNavigate } from 'react-router-dom';

const YuvaJobsHomepage = () => {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // State for animations
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const [isHowItWorksVisible, setIsHowItWorksVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  
  // Mock job data
  const [featuredJobs, setFeaturedJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Remote", type: "Full-time", salary: "₹8-12 LPA", posted: "2 days ago" },
    { id: 2, title: "UX Designer", company: "DesignStudio", location: "Mumbai", type: "Contract", salary: "₹6-9 LPA", posted: "1 day ago" },
    { id: 3, title: "Backend Engineer", company: "DataSystems", location: "Bangalore", type: "Full-time", salary: "₹10-15 LPA", posted: "3 days ago" },
    { id: 4, title: "Marketing Manager", company: "GrowthHack", location: "Delhi", type: "Full-time", salary: "₹7-10 LPA", posted: "5 days ago" },
  ]);
  
  // Stats data
  const stats = [
    { label: "Jobs Posted", value: "5,000+", icon: "📋" },
    { label: "Companies", value: "1,200+", icon: "🏢" },
    { label: "Candidates Hired", value: "15,000+", icon: "👥" },
    { label: "Success Rate", value: "92%", icon: "📈" },
  ];
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === heroRef.current) {
              setIsHeroVisible(true);
            } else if (entry.target === featuresRef.current) {
              setIsFeaturesVisible(true);
            } else if (entry.target === howItWorksRef.current) {
              setIsHowItWorksVisible(true);
            } else if (entry.target === testimonialsRef.current) {
              setIsTestimonialsVisible(true);
            } else if (entry.target === ctaRef.current) {
              setIsCtaVisible(true);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

 
  const navigate = useNavigate() 
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      {/* Header/Navigation */}
      {/* <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container md:px-24 mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">YJ</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Yuva<span className="text-blue-600">Jobs</span></h1>
          </div>


          
          
         
          
          <div className="flex space-x-4">
            <button className="px-5 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">
              Log In
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Sign Up
            </button>
          </div>
        </div>
      </header> */}
      
      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef} 
          id="home"
          className={`container mx-auto px-4 py-16 md:py-24 transition-all duration-1000 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-5">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 ">
              Find Your <span className="text-blue-600">Dream Job</span> with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              YuvaJobs connects talented youth with top employers. AI-powered job matching for candidates and streamlined hiring for companies.
            </p>
            
            {/* <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
              <div className="relative flex-grow max-w-xl">
                <input 
                  type="text" 
                  placeholder="Job title, skills, or company" 
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
                <button className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition">
                  Search
                </button>
              </div>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition">
                Advanced Filters
              </button>
            </div> */}
            
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-700 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          ref={featuresRef}
          id="employers"
          className="container mx-auto px-4 py-16"
        >
          <div className={`text-center mb-12 transition-all duration-1000 ${isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Employers & Job Seekers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Powerful tools for both sides of the job market</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Employer Features */}
            <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-1000 ${isFeaturesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">👔</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Employers</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Post jobs easily with our intuitive dashboard</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Manage applicants, shortlist candidates, and schedule interviews</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">AI-powered candidate matching based on skills and experience</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Track hiring metrics and optimize your recruitment process</span>
                </li>
              </ul>
              
              <button className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Post a Job
              </button>
            </div>
            
            {/* Employee Features */}
            <div className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-1000 ${isFeaturesVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">👤</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Job Seekers</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Personalized job recommendations based on your interests</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Skill-based matching with relevant job opportunities</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Easy application process with resume parsing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Track your applications and interview schedules</span>
                </li>
              </ul>
              
              <button className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Upload Resume
              </button>
            </div>
          </div>
        </section>
        
        {/* Featured Jobs */}
        {/* <section id="jobs" className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
              <p className="text-gray-600">Curated opportunities based on current market trends</p>
            </div>
            <button className="px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 rounded-xl transition">
              View All Jobs →
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job, index) => (
              <div 
                key={job.id} 
                className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-gray-700">{job.company}</p>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    {job.type}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">💰</span>
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🕐</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium rounded-lg hover:from-blue-100 hover:to-indigo-100 transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section> */}
        
        {/* How It Works Section */}
        <section 
          ref={howItWorksRef}
          id="about"
          className="container mx-auto px-4 py-16"
        >
          <div className={`text-center mb-16 transition-all duration-1000 ${isHowItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How YuvaJobs Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A seamless process from job search to hiring</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Profile", desc: "Job seekers upload resumes and set preferences. Employers create company profiles.", icon: "📝" },
              { step: "2", title: "Smart Matching", desc: "Our AI matches candidates with jobs based on skills, interests, and preferences.", icon: "🤖" },
              { step: "3", title: "Connect & Hire", desc: "Employers review shortlisted candidates, schedule interviews, and make offers.", icon: "🤝" }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 ${isHowItWorksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute -top-5 left-8 w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Testimonials */}
        {/* <section 
          ref={testimonialsRef}
          className="container mx-auto px-4 py-16"
        >
          <div className={`text-center mb-12 transition-all duration-1000 ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">What our users say about YuvaJobs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", role: "Software Developer", quote: "YuvaJobs matched me with my dream job in just 2 weeks! The skill-based recommendations were spot on.", avatar: "PS" },
              { name: "Rahul Mehta", role: "HR Manager", quote: "As an employer, the dashboard makes it so easy to manage candidates and schedule interviews.", avatar: "RM" },
              { name: "Ananya Reddy", role: "Marketing Executive", quote: "Found 3 perfect job matches in my preferred location. The application process is seamless.", avatar: "AR" }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-1000 ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section> */}
        
        {/* CTA Section */}
        <section 
          ref={ctaRef}
          className="container mx-auto px-4 py-16"
        >
          <div className={`bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center transition-all duration-1000 ${isCtaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
            <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of job seekers and employers who have found success with YuvaJobs
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button
              onClick={()=> navigate('/signup')}
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                Sign Up as Job Seeker
              </button>
              <button
              onClick={()=> navigate('/recruiter/login')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-0.5">
                Register as Employer
              </button>
            </div>
            
            <p className="text-blue-200 mt-8">No credit card required • Free plan available</p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">YJ</span>
                </div>
                <h2 className="text-2xl font-bold">Yuva<span className="text-blue-400">Jobs</span></h2>
              </div>
              <p className="text-gray-400">Connecting talent with opportunity through AI-powered job matching.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Job Seekers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition">Upload Resume</a></li>
                <li><a href="#" className="hover:text-white transition">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition">Salary Calculator</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Employers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Post a Job</a></li>
                <li><a href="#" className="hover:text-white transition">Browse Candidates</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Employer Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  <span>support@yuvajobs.com</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📱</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} YuvaJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default YuvaJobsHomepage;
