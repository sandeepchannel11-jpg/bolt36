import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, CreditCard as Edit, Trash2, Eye, Save, X, BookOpen, Brain, Heart, Music, Palette, Gamepad2, Target, Users, Clock, Star, Play, Moon, Zap, Shield, Award, Camera, Video, Headphones, Leaf, Sun, Wind, Waves, Coffee, Smile, Activity, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

interface TherapyModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sessions: number;
  category: string;
  tags: string[];
  status: 'active' | 'inactive';
  route: string;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

const ICON_OPTIONS = [
  { value: 'BookOpen', label: 'Book', component: BookOpen },
  { value: 'Brain', label: 'Brain', component: Brain },
  { value: 'Heart', label: 'Heart', component: Heart },
  { value: 'Music', label: 'Music', component: Music },
  { value: 'Palette', label: 'Palette', component: Palette },
  { value: 'Gamepad2', label: 'Game Controller', component: Gamepad2 },
  { value: 'Target', label: 'Target', component: Target },
  { value: 'Users', label: 'Users', component: Users },
  { value: 'Clock', label: 'Clock', component: Clock },
  { value: 'Star', label: 'Star', component: Star },
  { value: 'Play', label: 'Play', component: Play },
  { value: 'Moon', label: 'Moon', component: Moon },
  { value: 'Zap', label: 'Lightning', component: Zap },
  { value: 'Shield', label: 'Shield', component: Shield },
  { value: 'Award', label: 'Award', component: Award },
  { value: 'Camera', label: 'Camera', component: Camera },
  { value: 'Video', label: 'Video', component: Video },
  { value: 'Headphones', label: 'Headphones', component: Headphones },
  { value: 'Leaf', label: 'Leaf', component: Leaf },
  { value: 'Sun', label: 'Sun', component: Sun },
  { value: 'Wind', label: 'Wind', component: Wind },
  { value: 'Waves', label: 'Waves', component: Waves },
  { value: 'Coffee', label: 'Coffee', component: Coffee },
  { value: 'Smile', label: 'Smile', component: Smile },
  { value: 'Activity', label: 'Activity', component: Activity }
];

const COLOR_OPTIONS = [
  { value: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
  { value: 'from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
  { value: 'from-teal-500 to-green-500', label: 'Teal to Green' },
  { value: 'from-green-500 to-teal-500', label: 'Green to Teal' },
  { value: 'from-purple-500 to-blue-500', label: 'Purple to Blue' },
  { value: 'from-cyan-500 to-blue-500', label: 'Cyan to Blue' },
  { value: 'from-pink-500 to-purple-500', label: 'Pink to Purple' },
  { value: 'from-orange-500 to-red-500', label: 'Orange to Red' },
  { value: 'from-blue-500 to-indigo-500', label: 'Blue to Indigo' },
  { value: 'from-teal-500 to-cyan-500', label: 'Teal to Cyan' },
  { value: 'from-yellow-500 to-orange-500', label: 'Yellow to Orange' },
  { value: 'from-indigo-500 to-purple-500', label: 'Indigo to Purple' }
];

const CATEGORY_OPTIONS = [
  'Cognitive Therapy',
  'Mindfulness',
  'Stress Management',
  'Positive Psychology',
  'Relaxation',
  'Gamified Therapy',
  'Creative Therapy',
  'Behavioral Therapy',
  'Educational',
  'Acceptance Therapy',
  'Monitoring',
  'Wellness'
];

const TAG_OPTIONS = [
  'anxiety', 'depression', 'stress', 'mindfulness', 'relaxation',
  'cognitive', 'behavioral', 'creative', 'gamified', 'educational',
  'breathing', 'meditation', 'journaling', 'music', 'art',
  'exposure', 'acceptance', 'gratitude', 'sleep', 'mood'
];

function AdminTherapyManagement() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [therapyModules, setTherapyModules] = useState<TherapyModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<TherapyModule[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<TherapyModule | null>(null);
  const [formData, setFormData] = useState<Partial<TherapyModule>>({
    title: '',
    description: '',
    icon: 'Brain',
    color: 'from-purple-500 to-pink-500',
    duration: '15-20 min',
    difficulty: 'Beginner',
    sessions: 12,
    category: 'Cognitive Therapy',
    tags: [],
    status: 'active'
  });

  useEffect(() => {
    loadTherapyModules();
  }, []);

  useEffect(() => {
    filterModules();
  }, [therapyModules, searchTerm, statusFilter]);

  const loadTherapyModules = () => {
    // Load existing therapy modules from the TherapyModules page structure
    const defaultModules: TherapyModule[] = [
      {
        id: '1',
        title: 'CBT Thought Records',
        description: 'Cognitive Behavioral Therapy techniques with guided prompts',
        icon: 'BookOpen',
        color: 'from-purple-500 to-pink-500',
        duration: '15-20 min',
        difficulty: 'Beginner',
        sessions: 12,
        category: 'Cognitive Therapy',
        tags: ['cognitive', 'journaling', 'anxiety', 'depression'],
        status: 'active',
        route: '/therapy-modules/cbt',
        moduleId: 'cbt',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '2',
        title: 'Mindfulness & Breathing',
        description: 'Mindfulness and relaxation exercises with audio guidance',
        icon: 'Brain',
        color: 'from-blue-500 to-cyan-500',
        duration: '10-30 min',
        difficulty: 'Beginner',
        sessions: 15,
        category: 'Mindfulness',
        tags: ['mindfulness', 'breathing', 'meditation', 'relaxation'],
        status: 'active',
        route: '/therapy-modules/mindfulness',
        moduleId: 'mindfulness',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '3',
        title: 'Stress Management',
        description: 'Learn effective coping strategies for daily stress',
        icon: 'Target',
        color: 'from-teal-500 to-green-500',
        duration: '15-20 min',
        difficulty: 'Beginner',
        sessions: 8,
        category: 'Stress Management',
        tags: ['stress', 'coping', 'relaxation'],
        status: 'active',
        route: '/therapy-modules/stress',
        moduleId: 'stress',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '4',
        title: 'Gratitude Journal',
        description: 'Daily gratitude practice with streak tracking',
        icon: 'Heart',
        color: 'from-green-500 to-teal-500',
        duration: '5-10 min',
        difficulty: 'Beginner',
        sessions: 21,
        category: 'Positive Psychology',
        tags: ['gratitude', 'journaling', 'positive'],
        status: 'active',
        route: '/therapy-modules/gratitude',
        moduleId: 'gratitude',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '5',
        title: 'Relaxation Music',
        description: 'Curated audio library for relaxation and focus',
        icon: 'Music',
        color: 'from-purple-500 to-blue-500',
        duration: 'Variable',
        difficulty: 'Beginner',
        sessions: 20,
        category: 'Relaxation',
        tags: ['music', 'relaxation', 'audio'],
        status: 'active',
        route: '/therapy-modules/music',
        moduleId: 'music',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '6',
        title: 'Tetris Therapy',
        description: 'Gamified stress relief and cognitive enhancement',
        icon: 'Gamepad2',
        color: 'from-cyan-500 to-blue-500',
        duration: '10-15 min',
        difficulty: 'Beginner',
        sessions: 12,
        category: 'Gamified Therapy',
        tags: ['gamified', 'stress', 'cognitive'],
        status: 'active',
        route: '/therapy-modules/tetris',
        moduleId: 'tetris',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '7',
        title: 'Art & Color Therapy',
        description: 'Creative expression through digital art and coloring',
        icon: 'Palette',
        color: 'from-pink-500 to-purple-500',
        duration: '20-30 min',
        difficulty: 'Beginner',
        sessions: 10,
        category: 'Creative Therapy',
        tags: ['art', 'creative', 'expression'],
        status: 'active',
        route: '/therapy-modules/art',
        moduleId: 'art',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '8',
        title: 'Exposure Therapy',
        description: 'Gradual exposure techniques for anxiety and phobias',
        icon: 'Target',
        color: 'from-orange-500 to-red-500',
        duration: '30-45 min',
        difficulty: 'Advanced',
        sessions: 12,
        category: 'Behavioral Therapy',
        tags: ['exposure', 'anxiety', 'phobias'],
        status: 'active',
        route: '/therapy-modules/exposure',
        moduleId: 'exposure',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '9',
        title: 'Video Therapy',
        description: 'Guided video sessions with therapeutic content',
        icon: 'Play',
        color: 'from-blue-500 to-indigo-500',
        duration: '20-40 min',
        difficulty: 'Intermediate',
        sessions: 16,
        category: 'Educational',
        tags: ['video', 'educational', 'guided'],
        status: 'active',
        route: '/therapy-modules/video',
        moduleId: 'video',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      },
      {
        id: '10',
        title: 'Acceptance & Commitment Therapy',
        description: 'ACT principles for psychological flexibility',
        icon: 'Star',
        color: 'from-teal-500 to-cyan-500',
        duration: '25-35 min',
        difficulty: 'Intermediate',
        sessions: 14,
        category: 'Acceptance Therapy',
        tags: ['acceptance', 'commitment', 'flexibility'],
        status: 'active',
        route: '/therapy-modules/act',
        moduleId: 'act',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ];

    // Load any custom modules from localStorage
    const savedModules = localStorage.getItem('mindcare_admin_therapy_modules');
    if (savedModules) {
      const customModules = JSON.parse(savedModules);
      setTherapyModules([...defaultModules, ...customModules]);
    } else {
      setTherapyModules(defaultModules);
    }
  };

  const filterModules = () => {
    let filtered = therapyModules;

    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(module => module.status === statusFilter);
    }

    setFilteredModules(filtered);
  };

  const openModal = (module?: TherapyModule) => {
    if (module) {
      setEditingModule(module);
      setFormData(module);
    } else {
      setEditingModule(null);
      setFormData({
        title: '',
        description: '',
        icon: 'Brain',
        color: 'from-purple-500 to-pink-500',
        duration: '15-20 min',
        difficulty: 'Beginner',
        sessions: 12,
        category: 'Cognitive Therapy',
        tags: [],
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingModule(null);
    setFormData({
      title: '',
      description: '',
      icon: 'Brain',
      color: 'from-purple-500 to-pink-500',
      duration: '15-20 min',
      difficulty: 'Beginner',
      sessions: 12,
      category: 'Cognitive Therapy',
      tags: [],
      status: 'active'
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  const validateForm = () => {
    if (!formData.title?.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.description?.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!formData.duration?.trim()) {
      toast.error('Duration is required');
      return false;
    }
    if (!formData.sessions || formData.sessions <= 0) {
      toast.error('Sessions must be a positive number');
      return false;
    }
    return true;
  };

  const saveModule = () => {
    if (!validateForm()) return;

    const now = new Date().toISOString();
    const moduleData: TherapyModule = {
      id: editingModule?.id || Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      icon: formData.icon!,
      color: formData.color!,
      duration: formData.duration!,
      difficulty: formData.difficulty!,
      sessions: formData.sessions!,
      category: formData.category!,
      tags: formData.tags || [],
      status: formData.status!,
      route: formData.route || `/therapy-modules/${formData.title?.toLowerCase().replace(/\s+/g, '-')}`,
      moduleId: formData.moduleId || formData.title?.toLowerCase().replace(/\s+/g, '-') || '',
      createdAt: editingModule?.createdAt || now,
      updatedAt: now
    };

    let updatedModules;
    if (editingModule) {
      updatedModules = therapyModules.map(m => m.id === editingModule.id ? moduleData : m);
      toast.success('Therapy module updated successfully!');
    } else {
      updatedModules = [...therapyModules, moduleData];
      toast.success('New therapy module created successfully!');
    }

    setTherapyModules(updatedModules);
    
    // Save custom modules (excluding default ones)
    const customModules = updatedModules.filter(m => parseInt(m.id) > 10);
    localStorage.setItem('mindcare_admin_therapy_modules', JSON.stringify(customModules));
    
    closeModal();
  };

  const deleteModule = (moduleId: string) => {
    const module = therapyModules.find(m => m.id === moduleId);
    if (!module) return;

    if (window.confirm(`Are you sure you want to delete "${module.title}"? This action cannot be undone.`)) {
      const updatedModules = therapyModules.filter(m => m.id !== moduleId);
      setTherapyModules(updatedModules);
      
      // Save custom modules
      const customModules = updatedModules.filter(m => parseInt(m.id) > 10);
      localStorage.setItem('mindcare_admin_therapy_modules', JSON.stringify(customModules));
      
      toast.success('Therapy module deleted successfully!');
    }
  };

  const toggleStatus = (moduleId: string) => {
    const updatedModules = therapyModules.map(m => 
      m.id === moduleId ? { ...m, status: m.status === 'active' ? 'inactive' : 'active', updatedAt: new Date().toISOString() } : m
    );
    setTherapyModules(updatedModules);
    
    // Save custom modules
    const customModules = updatedModules.filter(m => parseInt(m.id) > 10);
    localStorage.setItem('mindcare_admin_therapy_modules', JSON.stringify(customModules));
    
    const module = updatedModules.find(m => m.id === moduleId);
    toast.success(`${module?.title} ${module?.status === 'active' ? 'activated' : 'deactivated'}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = ICON_OPTIONS.find(option => option.value === iconName);
    return iconOption?.component || Brain;
  };

  const stats = [
    {
      title: 'Total Therapies',
      value: therapyModules.length,
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Active Therapies',
      value: therapyModules.filter(m => m.status === 'active').length,
      icon: CheckCircle,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Categories',
      value: new Set(therapyModules.map(m => m.category)).size,
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Total Sessions',
      value: therapyModules.reduce((sum, m) => sum + m.sessions, 0),
      icon: Clock,
      color: 'from-orange-500 to-red-500'
    }
  ];

  if (user?.role !== 'admin') {
    return (
      <div className={`h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50'
      }`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
            Access Denied
          </h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            You don't have permission to manage therapy content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50'
    }`}>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Therapy Content Management
              </h1>
              <p className={`text-base ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Manage therapy modules, content, and configurations
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Therapy</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl shadow-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.title}
                  </h3>
                  <p className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-4 p-4 rounded-xl shadow-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search therapies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              <div className="flex space-x-2">
                {(['all', 'active', 'inactive'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                      statusFilter === status
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Therapy Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredModules.map((module, index) => {
            const IconComponent = getIconComponent(module.icon);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:shadow-xl'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStatus(module.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        module.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          module.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <h3 className={`text-base font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                  {module.title}
                </h3>
                
                <p className={`text-xs mb-3 line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {module.description}
                </p>

                {/* Details */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Duration:
                    </span>
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {module.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Sessions:
                    </span>
                    <span className={`text-xs font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {module.sessions}
                    </span>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                    {module.status}
                  </span>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {module.category}
                  </span>
                </div>

                {/* Tags */}
                {module.tags.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {module.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-full text-xs ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {module.tags.length > 3 && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{module.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(module)}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      title="Edit therapy"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteModule(module.id)}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete therapy"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Updated {new Date(module.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      {editingModule ? 'Edit Therapy Module' : 'Add New Therapy Module'}
                    </h2>
                    <button
                      onClick={closeModal}
                      className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Title *
                        </label>
                        <input
                          type="text"
                          value={formData.title || ''}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Enter therapy title"
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Description *
                        </label>
                        <textarea
                          value={formData.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe the therapy module"
                          rows={3}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Icon Selection */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Icon
                        </label>
                        <select
                          value={formData.icon || 'Brain'}
                          onChange={(e) => handleInputChange('icon', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {ICON_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Color Gradient */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Color Gradient
                        </label>
                        <select
                          value={formData.color || 'from-purple-500 to-pink-500'}
                          onChange={(e) => handleInputChange('color', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {COLOR_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {/* Color Preview */}
                        <div className="mt-2">
                          <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${formData.color}`}></div>
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Duration *
                        </label>
                        <input
                          type="text"
                          value={formData.duration || ''}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                          placeholder="e.g., 15-20 min"
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Difficulty Level */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Difficulty Level
                        </label>
                        <select
                          value={formData.difficulty || 'Beginner'}
                          onChange={(e) => handleInputChange('difficulty', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>

                      {/* Sessions */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Number of Sessions *
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={formData.sessions || ''}
                          onChange={(e) => handleInputChange('sessions', parseInt(e.target.value))}
                          placeholder="12"
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Category
                        </label>
                        <select
                          value={formData.category || 'Cognitive Therapy'}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        >
                          {CATEGORY_OPTIONS.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tags */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Tags (Select all that apply)
                        </label>
                        <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                          {TAG_OPTIONS.map((tag) => (
                            <motion.button
                              key={tag}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleTagToggle(tag)}
                              className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                                formData.tags?.includes(tag)
                                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                                  : theme === 'dark'
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {tag}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Status
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleInputChange('status', formData.status === 'active' ? 'inactive' : 'active')}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              formData.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                formData.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                          <span className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}>
                            {formData.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-6">
                    <h3 className={`text-lg font-semibold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-800'
                    }`}>
                      Preview
                    </h3>
                    <div className={`p-4 rounded-xl border-2 border-dashed ${
                      theme === 'dark' ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${formData.color} flex items-center justify-center`}>
                          {React.createElement(getIconComponent(formData.icon || 'Brain'), {
                            className: "w-6 h-6 text-white"
                          })}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-800'
                          }`}>
                            {formData.title || 'Therapy Title'}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {formData.description || 'Therapy description will appear here'}
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(formData.difficulty || 'Beginner')}`}>
                              {formData.difficulty}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              theme === 'dark' ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                            }`}>
                              {formData.category}
                            </span>
                            <span className={`text-xs ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {formData.duration} • {formData.sessions} sessions
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveModule}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingModule ? 'Update Module' : 'Create Module'}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeModal}
                      className={`px-6 py-3 rounded-xl font-semibold ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AdminTherapyManagement;