'use client'

import { useState, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MusicPlayerProps {
  autoPlay?: boolean
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const playMusic = async () => {
    if (audio) {
      try {
        console.log('Manual play music called')
        await audio.play()
        setIsPlaying(true)
        console.log('Manual audio playback started successfully')
      } catch (error) {
        console.log('Manual audio play failed:', error)
      }
    } else {
      console.log('Audio not initialized for manual play')
    }
  }

  const pauseMusic = () => {
    if (audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    // Initialize audio - for now using a placeholder
    // Later we'll add the actual wedding song
    const audioElement = new Audio('/audio/wedding-song.mp3')
    audioElement.loop = true
    audioElement.volume = 0.7
    setAudio(audioElement)

    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ''
      }
    }
  }, [])

  // Separate effect to handle autoPlay changes
  useEffect(() => {
    console.log('AutoPlay effect triggered:', { autoPlay, audio: !!audio })
    if (autoPlay && audio) {
      console.log('Attempting to play music automatically')
      const play = async () => {
        try {
          console.log('Starting audio playback')
          await audio.play()
          setIsPlaying(true)
          console.log('Audio playback started successfully')
        } catch (error) {
          console.log('Audio play failed:', error)
        }
      }
      play()
    }
  }, [autoPlay, audio])

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={toggleMusic}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white/95 text-gray-700 rounded-full w-12 h-12 p-0"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </Button>
    </div>
  )
}
