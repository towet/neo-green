import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Brain,
  BarChart3,
  Workflow,
  MessageSquare,
  TrendingUp,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Sparkles,
  Users,
  LineChart,
  Clock,
  CheckCircle,
  Target,
  BarChart,
  Rocket,
  Star,
  Calendar,
  Calculator,
  FileText,
  ChevronDown,
  Send,
  Lightbulb,
  RefreshCw,
  User,
  Cpu,
  Award,
  Trophy,
  ArrowUp,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import automationBg from './assets/automation-bg.jpg';
import heroSvg from './assets/hero-automation.svg';

interface Feature {
  title: string;
  description: string;
}

interface Service {
  icon: JSX.Element;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  features: Feature[];
  additionalInfo?: {
    useCases: string[];
    implementation: string[];
    roi: string[];
  };
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

function Modal({ 
  isOpen, 
  onClose, 
  service 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  service: Service;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-[#25D366]/20 rounded-lg">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{service.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6">
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Target className="w-4 h-4 mr-2 text-[#25D366]" />
                Use Cases
              </h4>
              <ul className="grid grid-cols-1 gap-3 sm:gap-4">
                {service.additionalInfo?.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-600">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Workflow className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#25D366]" />
                Implementation Process
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {service.additionalInfo?.implementation.map((step, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center text-sm sm:text-base">
                      {i + 1}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#25D366]" />
                ROI & Benefits
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {service.additionalInfo?.roi.map((item, i) => (
                  <div key={i} className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-[#25D366] text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-[#22c35e] transition-all duration-300 font-semibold text-sm sm:text-base"
            >
              Get Started with {service.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [showRoiNotification, setShowRoiNotification] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .slide-in-right, .scale-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const services: Service[] = [
    {
      icon: <Workflow className="w-16 h-16 text-[#25D366] group-hover:scale-110 transition-transform duration-500" />,
      title: "Business Process Automation",
      subtitle: "Streamline Your Operations",
      description: "Simplify complex operations with our end-to-end automation solutions designed to reduce manual tasks and improve efficiency.",
      benefits: [
        "Reduce manual tasks by 80%",
        "Streamline workflows",
        "Cut operational costs"
      ],
      features: [
        {
          title: "Workflow Automation",
          description: "Automate repetitive tasks across departments"
        },
        {
          title: "Process Streamlining",
          description: "Seamless integration with existing systems"
        }
      ],
      additionalInfo: {
        useCases: [
          "HR onboarding and documentation automation",
          "Financial reporting and reconciliation",
          "Supply chain management optimization",
          "Customer service workflow automation"
        ],
        implementation: [
          "Initial process analysis and mapping",
          "Custom automation solution design",
          "Seamless integration with existing systems",
          "Employee training and deployment"
        ],
        roi: [
          "80% reduction in processing time",
          "60% decrease in operational costs",
          "90% improvement in accuracy",
          "Rapid ROI within 6-12 months"
        ]
      }
    },
    {
      icon: <MessageSquare className="w-16 h-16 text-[#25D366] group-hover:scale-110 transition-transform duration-500" />,
      title: "AI Chatbots & Assistants",
      subtitle: "24/7 Intelligent Support",
      description: "Enhance customer engagement with AI-powered virtual assistants that work tirelessly to provide personalized support.",
      benefits: [
        "24/7 automated support",
        "90% faster responses",
        "Improved satisfaction"
      ],
      features: [
        {
          title: "Lead Generation",
          description: "Capture and qualify leads automatically"
        },
        {
          title: "Instant Support",
          description: "Real-time query resolution"
        }
      ],
      additionalInfo: {
        useCases: [
          "Customer service automation",
          "Lead qualification and nurturing",
          "Product recommendations",
          "Appointment scheduling"
        ],
        implementation: [
          "Chatbot personality design",
          "Knowledge base integration",
          "Multi-channel deployment",
          "Continuous learning setup"
        ],
        roi: [
          "70% reduction in support costs",
          "24/7 availability increases sales",
          "3x increase in lead qualification",
          "95% customer satisfaction rate"
        ]
      }
    },
    {
      icon: <Brain className="w-16 h-16 text-[#25D366] group-hover:scale-110 transition-transform duration-500" />,
      title: "Marketing Automation",
      subtitle: "Data-Driven Campaigns",
      description: "Supercharge your marketing with AI-driven strategies that deliver the right message to the right audience.",
      benefits: [
        "3x higher conversion",
        "Personalized journeys",
        "Automated content"
      ],
      features: [
        {
          title: "Campaign Automation",
          description: "Launch and optimize automatically"
        },
        {
          title: "Content Generation",
          description: "AI-powered content creation"
        }
      ],
      additionalInfo: {
        useCases: [
          "Email marketing automation",
          "Social media management",
          "Content personalization",
          "Campaign optimization"
        ],
        implementation: [
          "Marketing strategy development",
          "Channel integration setup",
          "Content automation workflow",
          "Analytics configuration"
        ],
        roi: [
          "200% increase in engagement",
          "50% reduction in campaign costs",
          "4x improvement in conversion rates",
          "Automated A/B testing results"
        ]
      }
    },
    {
      icon: <BarChart3 className="w-16 h-16 text-[#25D366] group-hover:scale-110 transition-transform duration-500" />,
      title: "Predictive Analytics",
      subtitle: "Data-Driven Decisions",
      description: "Transform raw data into actionable insights with AI-powered analytics that help you make informed decisions.",
      benefits: [
        "95% forecast accuracy",
        "Early trend detection",
        "Risk mitigation"
      ],
      features: [
        {
          title: "Trend Forecasting",
          description: "Predict market trends"
        },
        {
          title: "Pattern Recognition",
          description: "Identify opportunities"
        }
      ],
      additionalInfo: {
        useCases: [
          "Sales forecasting",
          "Inventory optimization",
          "Risk assessment",
          "Customer behavior analysis"
        ],
        implementation: [
          "Data source integration",
          "Model development",
          "Dashboard creation",
          "Team training"
        ],
        roi: [
          "30% inventory cost reduction",
          "25% increase in sales accuracy",
          "40% better resource allocation",
          "Early risk detection savings"
        ]
      }
    }
  ];

  const stats = [
    { icon: <Target className="w-8 h-8" />, value: "99%", label: "Accuracy Rate" },
    { icon: <Users className="w-8 h-8" />, value: "10k+", label: "Clients Served" },
    { icon: <BarChart className="w-8 h-8" />, value: "85%", label: "Cost Reduction" },
    { icon: <Rocket className="w-8 h-8" />, value: "3x", label: "Faster Growth" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      image: "https://t3.ftcdn.net/jpg/06/23/19/56/360_F_623195664_2OjcC5ZK5h81Wrk3x96cjptqN8Vw00Us.jpg",
      content: "The AI automation platform has revolutionized our workflow. We've seen a 60% reduction in processing time and significantly improved accuracy.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Operations Director, GlobalTech",
      image: "https://img.freepik.com/premium-photo/happy-black-man-arms-crossed-business-portrait-corporate-motivation-company-about-us-profile-picture-smile-confident-mature-management-person-success-mindset-ceo-introduction_590464-162127.jpg",
      content: "Implementation was smooth and the results were immediate. Our team can now focus on strategic tasks while the AI handles routine operations.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Innovation, FutureCo",
      image: "https://images.pexels.com/photos/8871934/pexels-photo-8871934.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      content: "The predictive analytics feature has given us invaluable insights. We're now able to make data-driven decisions with confidence.",
      rating: 5
    }
  ];

  const RoiNotification = () => {
    if (!showRoiNotification) return null;

    return (
      <div 
        className="fixed top-4 right-4 bg-[#25D366] text-white p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-fade-in z-50 max-w-md"
        style={{
          animation: 'slideIn 0.5s ease-out'
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-full p-2">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">Coming Soon!</h4>
            <p className="text-gray-300">Our ROI Calculator feature is under development. Stay tuned for updates!</p>
          </div>
          <button 
            onClick={() => setShowRoiNotification(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-fade-in {
        animation: slideIn 0.5s ease-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/254795704273?text=Hi,%20I%27m%20interested%20in%20learning%20more%20about%20Nova%20Automations%20AI%20solutions.', '_blank');
    setIsConsultModalOpen(false);
  };

  const handleEmailContact = () => {
    window.open('mailto:frankyfreaky103@gmail.com?subject=Inquiry%20about%20Nova%20Automations%20AI%20Solutions&body=Hi,%20I%27m%20interested%20in%20learning%20more%20about%20your%20AI%20automation%20solutions.', '_blank');
    setIsConsultModalOpen(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50"
        style={{ 
          background: `linear-gradient(to right, #25D366 ${scrollProgress}%, transparent ${scrollProgress}%)` 
        }} 
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Nova Automations</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
              <button className="px-6 py-2 rounded-full bg-[#25D366] text-white hover:bg-[#22c35e] transition-colors duration-200">
                Contact Us
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ top: '80px' }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
          
          {/* Menu Container */}
          <div className="relative z-10 bg-white min-h-[calc(100vh-80px)] flex flex-col items-center justify-center space-y-8 p-6">
            <div className="w-full max-w-sm space-y-8">
              <a 
                href="#services" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-3 text-lg text-gray-600 hover:text-gray-900 transition-all duration-200 border-b border-gray-100"
              >
                Services
              </a>
              <a 
                href="#features" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-3 text-lg text-gray-600 hover:text-gray-900 transition-all duration-200 border-b border-gray-100"
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center py-3 text-lg text-gray-600 hover:text-gray-900 transition-all duration-200 border-b border-gray-100"
              >
                Testimonials
              </a>
              <button className="w-full px-6 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#22c35e] transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-12 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.15),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 animate-on-scroll">
                Transform your business with{' '}
                <span className="text-[#25D366]">AI Automation</span>
              </h1>
              <p className="text-lg sm:text-xl mb-8 max-w-xl text-gray-600 animate-on-scroll stagger-1">
                Revolutionize your operations with cutting-edge AI solutions. Boost efficiency, reduce costs, and drive growth with Nova Automations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll stagger-2">
                <button 
                  onClick={() => setIsConsultModalOpen(true)}
                  className="px-8 py-4 bg-[#25D366] text-white rounded-full hover:bg-[#22c35e] transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold flex items-center justify-center group"
                >
                  Talk to AI Expert
                  <MessageSquare className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    setShowRoiNotification(true);
                    setTimeout(() => setShowRoiNotification(false), 5000);
                  }}
                  className="px-8 py-4 bg-white text-black border-2 border-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-all duration-300 text-lg font-semibold flex items-center justify-center group"
                >
                  Calculate ROI
                  <Calculator className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="hero-image">
                <img 
                  src={heroSvg}
                  alt="AI Automation Illustration" 
                  className="w-full h-auto max-w-lg mx-auto"
                />
                <div className="hero-image-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 sm:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Revolutionize Your Business with AI Automation
            </h2>
            <p className="text-lg sm:text-xl">
              Transform your business operations with our cutting-edge AI automation solutions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Operational Consistency",
                description: "Ensure consistent, error-free operations by automating routine tasks and processes.",
                icon: <RefreshCw className="w-6 h-6" />,
                image: "https://www.nocontractvoip.com/wp-content/uploads/2022/08/automation-software-technology-process-system-business-concept-123697421.jpg"
              },
              {
                title: "24/7 Intelligent Support",
                description: "Provide round-the-clock support with AI-powered virtual assistants.",
                icon: <MessageSquare className="w-6 h-6" />,
                image: "https://www.morgan.edu/Images/News/VirtualAssistant.jpg"
              },
              {
                title: "Data-Driven Decision Making",
                description: "Leverage predictive analytics to forecast trends, optimize processes, and make smarter business decisions.",
                icon: <LineChart className="w-6 h-6" />,
                image: "https://cloudinary.hbs.edu/hbsit/image/upload/s--uAllk4jk--/f_auto,c_fill,h_375,w_750,/v20200101/E27A81911827B4322705AE6E63EC9E57.jpg"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-image-container h-64">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="feature-image w-full h-full object-cover"
                  />
                  <div className="feature-overlay absolute inset-0" />
                </div>
                
                <div className="feature-icon-container inline-flex">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                </div>
                
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(6,182,212,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(6,182,212,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Nova Automations
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  Founded in 2024, Nova Automations stands at the forefront of AI automation innovation. 
                  We're not just another technology company – we're pioneers in transforming how businesses 
                  operate in the digital age.
                </p>
                <p className="leading-relaxed">
                  Our mission is to democratize AI technology, making enterprise-grade automation accessible 
                  to businesses of all sizes. We believe that the future of work is intelligent, efficient, 
                  and human-centric.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Our Expertise</h4>
              <ul className="space-y-6">
                {[
                  {
                    title: "24/7 Intelligent Chatbot",
                    description: "Integrate AI-powered chatbots and virtual assistants that resolve customer queries instantly, handle reception, and upsell products seamlessly.",
                    icon: <MessageSquare className="w-5 h-5" />
                  },
                  {
                    title: "Marketing Automation",
                    description: "Leverage AI to create personalized marketing content and strategies based on market analysis, improving ROI on marketing efforts.",
                    icon: <Target className="w-5 h-5" />
                  },
                  {
                    title: "Workflow Automation",
                    description: "Automate repetitive tasks across departments such as HR, finance, procurement and operations.",
                    icon: <Cpu className="w-5 h-5" />
                  },
                  {
                    title: "Predictive Analytics",
                    description: "Use AI-driven predictive analytics to forecast trends and customer behavior and optimize marketing strategies and inventory management by predicting demand patterns.",
                    icon: <LineChart className="w-5 h-5" />
                  }
                ].map((expertise, index) => (
                  <div 
                    key={index}
                    className="group bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-[#25D366]">
                          {expertise.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{expertise.title}</h4>
                        <p className="text-gray-600">{expertise.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.15),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive automation solutions designed to transform your business operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 transition-all duration-300 
                  border border-gray-100 hover:border-gray-200
                  shadow-sm hover:shadow-xl hover:shadow-gray-100/50
                  relative overflow-hidden animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6 sm:mb-8">
                    <div className="flex-shrink-0">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden transition-colors duration-300">
                        {service.title === "Business Process Automation" && (
                          <img 
                            src="https://www.nocontractvoip.com/wp-content/uploads/2022/08/automation-software-technology-process-system-business-concept-123697421.jpg"
                            alt="Business Process Automation"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        {service.title === "AI Chatbots & Assistants" && (
                          <img 
                            src="https://www.morgan.edu/Images/News/VirtualAssistant.jpg"
                            alt="AI Chatbots & Assistants"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        {service.title === "Marketing Automation" && (
                          <img 
                            src="https://www.corefactors.in/blog/content/images/2024/06/Blog-Banner--3---1-.png"
                            alt="Marketing Automation"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        {service.title === "Predictive Analytics" && (
                          <img 
                            src="https://d3an9kf42ylj3p.cloudfront.net/uploads/2023/02/amt_machinelearningpredictiveanalytics_feb-23.jpg"
                            alt="Predictive Analytics"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        {!["Business Process Automation", "AI Chatbots & Assistants", "Marketing Automation", "Predictive Analytics"].includes(service.title) && (
                          <div className="text-[#25D366]">
                            {service.icon}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 font-medium">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-[#25D366]" />
                        Key Benefits
                      </h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {service.benefits.map((benefit, i) => (
                          <li 
                            key={i} 
                            className="flex items-start text-gray-600 text-sm sm:text-base"
                          >
                            <CheckCircle className="w-5 h-5 text-[#25D366] mr-2 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="mt-6 sm:mt-8 w-full inline-flex items-center justify-center px-6 py-3.5 
                      bg-[#25D366] text-white rounded-lg
                      font-semibold text-sm sm:text-base
                      transform transition-all duration-300
                      hover:bg-[#22c35e] hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              See how other businesses have transformed their operations with our AI automation solutions 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "We reduced our processing time by 75% and saved in operational costs within the first 6 months.",
                author: "Sarah ",
                position: "COO, TechCorp ",
                image: "https://t3.ftcdn.net/jpg/06/23/19/56/360_F_623195664_2OjcC5ZK5h81Wrk3x96cjptqN8Vw00Us.jpg",
                rating: 5,
                metric: "75% faster processing"
              },
              {
                quote: "The ROI was immediate. Our team now handles 3x the workload without any additional headcount.",
                author: "Michael ",
                position: "Operations Director",
                image: "https://img.freepik.com/premium-photo/happy-black-man-arms-crossed-business-portrait-corporate-motivation-company-about-us-profile-picture-smile-confident-mature-management-person-success-mindset-ceo-introduction_590464-162127.jpg",
                rating: 5,
                metric: "300% productivity boost"
              },
              {
                quote: "Their AI automation eliminated manual data entry and reduced our error rate to nearly zero.",
                author: "Emily Watson",
                position: "CFO, Finance",
                image: "https://images.pexels.com/photos/8871934/pexels-photo-8871934.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                rating: 5,
                metric: "99.9% accuracy rate"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover object-center"
                  />
                  <div>
                    <div className="text-gray-900 font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.position}</div>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="bg-[#25D366]/10 rounded-lg px-4 py-2 inline-block">
                  <span className="text-[#25D366] font-semibold">{testimonial.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Book a free 20-minute consultation with our AI automation experts. We'll analyze your business processes and show you how to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="text-[#25D366] mb-3">
                  <TrendingUp className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-2">Boost Efficiency</h3>
                <p className="text-gray-600 text-sm">Cut operational costs by up to 40% with AI automation</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="text-[#25D366] mb-3">
                  <Clock className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-2">Save Time</h3>
                <p className="text-gray-600 text-sm">Automate repetitive tasks and save 15+ hours per week</p>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="text-[#25D366] mb-3">
                  <BarChart className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-white font-semibold mb-2">Scale Growth</h3>
                <p className="text-gray-600 text-sm">Handle 3x more tasks without adding headcount</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsConsultModalOpen(true)}
                className="px-8 py-4 bg-[#25D366] text-white rounded-full hover:bg-[#22c35e] transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg font-semibold flex items-center justify-center group"
              >
                Consult us free
                <Calendar className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-lg font-semibold flex items-center justify-center group border-2 border-gray-200">
                View Case Studies
                <FileText className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get answers to common questions about AI automation
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How quickly can we implement AI automation?",
                answer: "Most solutions can be implemented within 2-4 weeks, with some processes automated in as little as 48 hours. Our team handles the entire setup process."
              },
              {
                question: "Is AI automation secure?",
                answer: "Yes, we use bank-level encryption and comply with all major security standards including SOC 2, GDPR, and HIPAA. Your data is always protected."
              },
              {
                question: "What kind of ROI can we expect?",
                answer: "Our clients typically see ROI within 3-6 months, with cost reductions of 40-60% in automated processes. Use our ROI calculator for a custom estimate."
              },
              {
                question: "Do we need technical expertise?",
                answer: "No technical expertise is required. Our solutions are user-friendly and we provide full training and support for your team."
              },
              {
                question: "Can AI automation integrate with our existing systems?",
                answer: "Yes, our solutions integrate seamlessly with most major business systems and can be customized for proprietary software."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <button 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <div className={`transform transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nova Automations</h3>
              <p className="text-gray-600 mb-4">
                Transforming businesses through intelligent automation solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#25D366]">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#25D366]">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#25D366]">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Process Automation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">AI Chatbots</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Marketing Automation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#25D366]">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-center">
              &copy; {new Date().getFullYear()} Nova Automations. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
            <button 
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Talk to an AI Expert
            </h3>
            <p className="text-gray-600 mb-8">
              Choose your preferred way to connect with our AI automation experts:
            </p>

            <div className="space-y-4">
              <button
                onClick={handleWhatsAppContact}
                className="w-full py-6 px-6 bg-[#25D366] text-white rounded-xl hover:bg-[#22c35e] transition-all duration-300 flex items-center justify-center group"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" 
                  alt="WhatsApp"
                  className="w-10 h-10 mr-4"
                />
                <span className="text-lg font-semibold">Chat on WhatsApp</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleEmailContact}
                className="w-full py-6 px-6 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group border-2 border-gray-200"
              >
                <img 
                  src="https://static-00.iconduck.com/assets.00/gmail-icon-1024x1024-09wrt8am.png" 
                  alt="Gmail"
                  className="w-10 h-10 mr-4"
                />
                <span className="text-lg font-semibold">Send Email</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              We typically respond within 2 hours during business hours.
            </p>
          </div>
        </div>
      )}
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
      {showRoiNotification && (
        <RoiNotification />
      )}
    </div>
  );
}

export default App;