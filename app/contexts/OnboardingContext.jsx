'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');

  const [usernameVerified, setUsernameVerified] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [items, setItems] = useState([]);
  const [mobileItems, setMobileItems] = useState([]);
  const [theme, setTheme] = useState('');
  const [profile, setProfile] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [bio, setBio] = useState('');
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [generatedLayout, setGeneratedLayout] = useState(null);
  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;

  const nextStep = () => setStep((prev) => Math.min(totalSteps - 1, prev + 1));
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        username,
        setUsername,
        socialLinks,
        setSocialLinks,
        topics,
        setTopics,
        items,
        setItems,
        mobileItems,
        setMobileItems,
        profile,
        setProfile,
        totalSteps,
        progress,
        nextStep,
        prevStep,
        selectedTopics,
        setSelectedTopics,
        bio,
        setBio,
        usernameVerified,
        setUsernameVerified,
        selectedLinks,
        setSelectedLinks,
        inputValues,
        setInputValues,
        name,
        setName,
        theme,
        setTheme,
        generatedLayout,
        setGeneratedLayout,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}
