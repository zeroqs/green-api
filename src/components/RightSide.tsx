import React from 'react'

interface IRightSide {
  children: React.ReactNode
}

const RightSide = ({ children }: IRightSide) => {
  return <section className="basis-full pt-4">{children}</section>
}

export default RightSide
