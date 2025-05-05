"use client"
import React from 'react'
import { motion } from 'framer-motion'


const StaggerText = () => {
    return (
        <section className='grid h-screen place-content-center gap-2 bg-white text-black'>
            <FlipLink href="#">waterly</FlipLink>


        </section>
    )
}

export default StaggerText

const DURATION = 0.5;
const STAGGER = 0.025

const FlipLink = ({ children, href }: { children: string, href: string }) => {
    return <motion.a href={href}
        // initial="initial"
        // whileHover="hovered"

        className='relative block overflow-hidden whitespace-nowrap text-4xl font-black sm:text-7xl md:text-8xl p-5 lg:text-9xl'
    >
        <div className=''>
            {children.split("").map((letter, index) =>
                <motion.span
                initial={{y:0}}
                whileHover={{y: '-100%'}}
                    // variants={
                    //     {
                    //         initial: { y: 0 },
                    //         hovered: { y: '-10%' }
                    //     }
                    // }
                    transition={
                        {
                           duration: DURATION,
                           ease: "easeInOut",                 
                            type: "spring",
                            stiffness: 100,
                            damping: 5,
                            mass:1,
                            restDelta: 0.001,   // Ensures the animation ends with precision (smooth stop)
    
                        }}
                    className={`inline-block ${index % 2 !== 0 ? 'text-[#3474eb]' : ''}`}
                    key={`${letter}-${index}`}>
                    {letter}
                </motion.span>
            )}
        </div>
    </motion.a>
}