"use client"
import { useContext } from 'react'
import Hero from '../../components/Hero'
import { Store } from './context/Store'
import ErrorModal from '../../components/ErrorModal'

export default function Home() {
  const { state, dispatch } = useContext(Store)
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-zinc-500">
    <main>
      <Hero heading="Travel_Pharao`s picture shop" message="Here you can find my lastest, best pics and you can have them for yourself!!" />
    </main>
  )
}
