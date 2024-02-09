'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/app/contexts/OnboardingContext';
import { useTemplates } from '@/app/(root)/templates/context/TemplatesContext';
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Palette,
} from 'lucide-react';
import EmptyState from '@/components/EmptyState';

export default function OnboardingTemplates() {
  const {
    nextStep,
    prevStep,
    topics,
    items,
    setItems,
    setMobileItems,
    setTheme,
    selectedTopics,
    setGeneratedLayout,
  } = useOnboarding();
  const { templates, loading } = useTemplates();
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (templates && selectedTopics.length > 0) {
      // Filter templates if their category partially matches any selected topic
      const matches = templates.filter((template) =>
        selectedTopics.some((topic) => {
          // Check if topic has "category: subcategory" format and strip out the category
          const topicValue = topic.includes(': ')
            ? topic.split(': ')[1].toLowerCase()
            : topic.toLowerCase();
          return (
            template.category &&
            template.category.toLowerCase().includes(topicValue)
          );
        })
      );
      setFilteredTemplates(matches);
    } else if (templates) {
      setFilteredTemplates(templates);
    }
  }, [topics, templates, selectedTopics]);

  const handleTemplateClick = (templateId) => {
    // Toggle selection: if clicked template is already selected, deselect it
    setSelectedTemplate(selectedTemplate === templateId ? null : templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      // Find the selected template object using the ID
      const templateObject = filteredTemplates.find(
        (template) => template.uuid === selectedTemplate
      );

      if (templateObject) {
        // Set the items, mobileItems, and theme based on the selected template
        setItems(templateObject.items || []);
        setMobileItems(templateObject.mobileItems || []);
        setTheme(templateObject.theme || {});

        // Store the selected template in the context for later use in layout generation
        setGeneratedLayout({
          templateId: templateObject.id,
          templateName: templateObject.template_name,
          templateCategory: templateObject.category,
          items: templateObject.items || [],
          mobileItems: templateObject.mobileItems || [],
          theme: templateObject.theme || {},
        });
      }
    }

    nextStep();
  };

  const handleMakeFromScratch = () => {
    // Set selected template to null or a default template
    setSelectedTemplate(null);
    setGeneratedLayout(null);
    nextStep();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  };

  return (
    <motion.div
      className="mt-40 flex min-h-screen flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
      >
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
          </div>
        ) : (
          filteredTemplates.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8 text-center">
              <h1 className="mb-4 bg-gradient-to-r from-purple-700 to-indigo-500 bg-clip-text text-3xl font-bold text-gray-800 text-transparent">
                Choose a Template
              </h1>
              <p className="text-gray-600">
                We found templates matching your interests
              </p>
            </motion.div>
          )
        )}

        {/* Grid of Templates */}
        <motion.div
          variants={itemVariants}
          className={`${
            !loading && filteredTemplates.length > 0
              ? 'grid'
              : 'flex justify-center'
          } grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}
        >
          {!loading && filteredTemplates.length > 0 ? (
            filteredTemplates.map((template, index) => (
              <motion.div
                key={template.uuid}
                variants={itemVariants}
                custom={index}
                whileHover={{
                  y: -5,
                  boxShadow:
                    '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
                className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ${
                  selectedTemplate === template.uuid
                    ? 'ring-4 ring-purple-500 ring-opacity-70'
                    : 'ring-1 ring-gray-200 ring-purple-300'
                }`}
                onClick={() => handleTemplateClick(template.uuid)}
                onMouseEnter={() => setHoveredTemplate(template.uuid)}
                onMouseLeave={() => setHoveredTemplate(null)}
              >
                <div className="relative">
                  <motion.img
                    src={
                      template.template_image || '/images/default-template.png'
                    }
                    alt={template.template_name}
                    className="h-56 w-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{
                      scale:
                        hoveredTemplate === template.uuid ||
                        selectedTemplate === template.uuid
                          ? 1.05
                          : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity:
                        hoveredTemplate === template.uuid ||
                        selectedTemplate === template.uuid
                          ? 1
                          : 0.7,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{template.template_name}</div>
                    <div className="flex items-center gap-1">
                      <Palette size={14} />
                      <span className="text-xs">
                        {template.category || 'General'}
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedTemplate === template.uuid && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-2 top-2 rounded-full bg-green-500 p-1 shadow-lg"
                    >
                      <CheckCircle className="text-white" size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : !loading ? (
            <motion.div
              variants={itemVariants}
              className="flex w-full items-center justify-center"
            >
              <div className="mt-8">
                <EmptyState
                  title="No matching templates found"
                  text="But you can always make one from scratch!"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-4 flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleMakeFromScratch}
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300"
                    >
                      <Sparkles size={18} />
                      <span>Create from scratch</span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </motion.div>

        {/* Navigation Buttons */}
        {!loading && (
          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-1/2"
            >
              <Button
                onClick={prevStep}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-200 bg-gray-300 px-4 py-5 font-medium text-gray-800 transition-all duration-300"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-1/2"
            >
              <Button
                onClick={handleContinue}
                disabled={!selectedTemplate && filteredTemplates.length > 0}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 from-purple-700 to-indigo-600 to-indigo-700 px-4 py-5 font-medium text-white shadow-lg transition-all duration-300 disabled:opacity-70 disabled:shadow-none"
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {!loading && filteredTemplates.length > 0 && (
          <motion.button
            variants={itemVariants}
            onClick={handleMakeFromScratch}
            className="mx-auto mt-6 block text-sm text-gray-500 text-gray-700 underline transition-colors duration-300"
          >
            Start from scratch instead
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
