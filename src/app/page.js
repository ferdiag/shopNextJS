"use client"
import { useContext } from 'react'
import Hero from '../../components/Hero'
import { Store } from './context/Store'
import ErrorModal from '../../components/ErrorModal'

export default function Home() {
  const { state, dispatch } = useContext(Store)
  return (
    <main>
      <Hero heading="Travel_Pharao`s picture shop" message="Here you can find my latest, best pics and you can have them for yourself!!" />
    </main>
  )
}
