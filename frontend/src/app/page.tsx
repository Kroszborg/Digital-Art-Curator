'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Menu, X, ChevronRight, Instagram, Twitter, Linkedin, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

import { ReactNode } from 'react';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <motion.div
        initial={{ scale: 0.5, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const artStyles = ['Abstract', 'Impressionism', 'Surrealism', 'Pop Art', 'Minimalism']
const artThemes = ['Nature', 'Urban', 'Fantasy', 'Portrait', 'Still Life']
const colorPalettes = ['Vibrant', 'Pastel', 'Monochrome', 'Earth Tones', 'Neon']

const mockArtworks = [
  { id: 1, title: 'Neon Dreams', artist: 'Alex Neon', style: 'Pop Art', theme: 'Urban', colors: 'Neon', image: '/public/placeholder.svg?height=400&width=300' },
  { id: 2, title: 'Serene Forest', artist: 'Emma Nature', style: 'Impressionism', theme: 'Nature', colors: 'Earth Tones', image: '/public/placeholder.svg?height=400&width=300' },
  { id: 3, title: 'Urban Minimalist', artist: 'Mike Minimal', style: 'Minimalism', theme: 'Urban', colors: 'Monochrome', image: '/public/placeholder.svg?height=400&width=300' },
  { id: 4, title: 'Dreamy Landscape', artist: 'Sarah Dream', style: 'Surrealism', theme: 'Fantasy', colors: 'Pastel', image: '/public/placeholder.svg?height=400&width=300' },
  { id: 5, title: 'Vibrant Abstraction', artist: 'Chris Color', style: 'Abstract', theme: 'Still Life', colors: 'Vibrant', image: '/public/placeholder.svg?height=400&width=300' },
  { id: 6, title: 'City Lights', artist: 'Olivia Urban', style: 'Impressionism', theme: 'Urban', colors: 'Vibrant', image: '/public/placeholder.svg?height=400&width=300' },
]

export default function DigitalArtsCurator() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [preferences, setPreferences] = useState({ style: '', theme: '', colors: '' })
  const [recommendations, setRecommendations] = useState<{ id: number; title: string; artist: string; style: string; theme: string; colors: string; image: string; }[]>([])
  const [selectedArtwork, setSelectedArtwork] = useState<{ id: number; title: string; artist: string; style: string; theme: string; colors: string; image: string; } | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handlePreferenceChange = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const getRecommendations = () => {
    // In a real application, this would be an API call to a backend service
    const filtered = mockArtworks.filter(artwork => 
      (!preferences.style || artwork.style === preferences.style) &&
      (!preferences.theme || artwork.theme === preferences.theme) &&
      (!preferences.colors || artwork.colors === preferences.colors)
    )
    setRecommendations(filtered)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold"
              >
                DigitalArtCurator
              </motion.span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              {['Home', 'Gallery', 'About', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <Link href={`#${item.toLowerCase()}`} className="text-foreground/60 hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background md:hidden"
            >
              <div className="container flex flex-col items-center justify-center h-full space-y-8">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={toggleMenu}>
                  <X />
                </Button>
                {['Home', 'Gallery', 'About', 'Contact'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <Link href={`#${item.toLowerCase()}`} className="text-2xl" onClick={toggleMenu}>
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main>
          {/* Hero Section */}
          <section id="home" className="py-20 md:py-32 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-900 dark:to-pink-900 text-white overflow-hidden">
            <div className="container text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Discover Your Perfect Art
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl mb-8"
              >
                Personalized digital art recommendations tailored to your taste
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button size="lg" asChild>
                  <Link href="#gallery">
                    Start Exploring <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Preference Selection Section */}
          <section id="preferences" className="py-20 bg-muted dark:bg-gray-900">
            <div className="container">
              <h2 className="text-3xl font-bold mb-10 text-center">Select Your Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select onValueChange={(value) => handlePreferenceChange('style', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Art Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {artStyles.map((style) => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handlePreferenceChange('theme', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {artThemes.map((theme) => (
                      <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handlePreferenceChange('colors', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Color Palette" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorPalettes.map((palette) => (
                      <SelectItem key={palette} value={palette}>{palette}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-8 text-center">
                <Button onClick={getRecommendations}>Get Recommendations</Button>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-20">
            <div className="container">
              <h2 className="text-3xl font-bold mb-10 text-center">Recommended Artworks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {recommendations.map((artwork) => (
                    <motion.div
                      key={artwork.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className="cursor-pointer" onClick={() => setSelectedArtwork(artwork)}>
                        <CardContent className="p-0">
                          <Image
                            src={artwork.image}
                            alt={artwork.title}
                            width={300}
                            height={400}
                            className="w-full h-[400px] object-cover rounded-t-lg"
                          />
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
                            <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Artwork Details Dialog */}
          <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedArtwork?.title}</DialogTitle>
                <DialogDescription>By {selectedArtwork?.artist}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <Image
                  src={selectedArtwork?.image || ''}
                  alt={selectedArtwork?.title || ''}
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
                <div className="mt-4 space-y-2">
                  <p><strong>Style:</strong> {selectedArtwork?.style}</p>
                  <p><strong>Theme:</strong> {selectedArtwork?.theme}</p>
                  <p><strong>Color Palette:</strong> {selectedArtwork?.colors}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* About Section */}
          <section id="about" className="py-20 bg-muted dark:bg-gray-900">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="md:w-1/2"
                >
                  <Image
                    src="/public/placeholder.svg?height=400&width=400"
                    alt="Curator"
                    width={400}
                    height={400}
                    className="rounded-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="md:w-1/2"
                >
                  <h2 className="text-3xl font-bold mb-6">About Digital Art Curator</h2>
                  <p className="text-lg mb-6">
                    Our AI-powered platform analyzes your preferences to curate a personalized collection of digital artworks. 
                    Discover new artists, explore various styles, and find the perfect piece for your digital gallery.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="#contact">Learn More</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="container">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-10 text-center"
              >
                Get in Touch
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md mx-auto"
              >
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea id="message" placeholder="Your message here..." />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted dark:bg-gray-900 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 md:mb-0"
              >
                <span className="text-2xl font-bold">DigitalArtCurator</span>
                <p className="text-sm text-muted-foreground mt-2">Discover your perfect digital art</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex space-x-4"
              >
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#"><Instagram /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#"><Twitter /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="#"><Linkedin /></Link>
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              © {new Date().getFullYear()} DigitalArtCurator. All rights reserved.
            </motion.div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}