"use client"
import React from 'react'
import { motion } from 'framer-motion'


const RevealLinks = () => {
    return (
        <section className='grid bg-white h-screen place-content-center gap-2 text-black'>
            <FlipLink href="#">waterly</FlipLink>


        </section>
    )
}

export default RevealLinks

const DURATION = 0.25;
const STAGGER = 0.025

const FlipLink = ({ children, href }: { children: string, href: string }) => {
    return <motion.a href={href}
        initial="initial"
        whileHover="hovered"

        className='relative block overflow-hidden whitespace-nowrap text-4xl font-black p-5 sm:text-7xl md:text-8xl lg:text-9xl'
    >
        <div className=''>
            {children.split("").map((letter, index) =>
                <motion.span
                    variants={
                        {
                            initial: { y: 0 },
                            hovered: { y: '-50%' }
                        }
                    }
                    transition={
                        {
                           duration: DURATION,
                           ease: "easeInOut",                 
                            type: "spring",
                            stiffness: 100,
                            damping: 5,
                            mass:1,
                            restDelta: 0.001,   // Ensures the animation ends with precision (smooth stop)
                            delay: STAGGER * index
                        }}
                    className={`inline-block ${index % 2 !== 0 ? 'text-[#3474eb]' : ''}`}
                    key={`${letter}-${index}`}>
                    {letter}
                </motion.span>
            )}
        </div>
        {/* <div className='absolute inset-0'>
            {children.split("").map((letter, index)=> 
            <motion.span
            variants={
                {
                    initial: {y: '100%'},
                    hovered: {y:0}
                }
            }
            key={`${letter}-${index}`}>
                {letter}
            </motion.span>
            )}
        </div> */}
    </motion.a>
}