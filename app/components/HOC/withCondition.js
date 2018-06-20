// @flow
import React from 'react'

const withCondition = <Props: {condition: boolean}>(
  WrapedComponent: React.ComponentType<Props>,
) =>
  (props: Props): ?React.ComponentType<Props> => {
    const { condition, ...rest } = props
    return !condition ? null :
    <WrapedComponent {...rest} />
  }

export default withCondition
