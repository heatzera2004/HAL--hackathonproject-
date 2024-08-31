import React from 'react'
import Layout from '../../components/layout/Layout'
import Video from '../../components/video/Video'

const Awareness = () => {
  return (
    <Layout>
      <header className="bg-green-500 p-4 text-white text-center rounded-md shadow-md">
        <h1 className="text-3xl font-bold">LEARN!</h1>
      </header>
      <Video 
      videoUrl='https://www.youtube.com/watch?v=0h5wFVBmU1s' 
      topic='Essential Market Farming Tools in the Field and Garden' 
      description='This video provides a comprehensive overview on how to use modern farming tools .' />
      <Video 
      videoUrl='https://www.youtube.com/watch?v=LXb3EKWsInQ' 
      topic='Understanding Climate Change' 
      description='This video provides a comprehensive overview of the impact of climate change on our environment.' />
    </Layout>
  )
}

export default Awareness
