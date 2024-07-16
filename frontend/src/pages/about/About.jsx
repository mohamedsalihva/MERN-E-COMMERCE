import React from 'react'

function About() {
  return (
    <section id='about' className='bg-white py-12 mt-6'>
    <div className='container mx-auto px-4 text-center'>
      <h2 className='text-4xl font-bold mb-6'>About Us</h2>
      <p className='text-lg mb-6'>
        Welcome to Ecommerce Store, your number one source for all things [product, ie: watches, mobiles, electronics]. We're dedicated to giving you the very best of [product], with a focus on three characteristics: dependability, customer service, and uniqueness.
      </p>
      <p className='text-lg mb-6'>
        Founded in [year] by [founder name], Ecommerce Store has come a long way from its beginnings in a [starting location, ie: home office, garage]. When [founder name] first started out, [his/her/their] passion for [brand message - ie: "eco-friendly cleaning products"] drove [him/her/them] to do intense research, quit [his/her/their] day job, and gave [him/her/them] the impetus to turn hard work and inspiration into a booming online store. We now serve customers all over [place, ie: the US, the world], and are thrilled to be a part of the [adjective, ie: eco-friendly, fair trade] wing of the [industry type, ie: fashion, baked goods] industry.
      </p>
      <p className='text-lg'>
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
      </p>
      <p className='text-lg mt-6'>
        Sincerely,
      </p>
      <p className='text-lg font-bold'>[Founder Name]</p>
    </div>
  </section>
  )
}

export default About