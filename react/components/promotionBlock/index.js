import React from 'react'
import styles from './promotionBlock.css'

const promotionBlock = (props) => {
  return (
    <div className={styles.layoutContainer}>
      <h2 className={styles.heading}>{props.heading}</h2>
      <h4 className={styles.subHeading}>{props.subHeading}</h4>
    </div>
  )
}

promotionBlock.schema = {
  title: 'promotionBlock',
  description: 'Edit the required section of promotionBlock page.',
  type: 'object',
  properties: {
    heading: {
      title: 'Heading',
      description: 'Page Heading',
      type: 'string',
      default: null,
    },
    subHeading: {
      title: 'Sub-Heading',
      description: 'sub heading for the page',
      type: 'string',
      default: null,
    },
  },
}
export default promotionBlock