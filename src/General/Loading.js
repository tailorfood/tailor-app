// @flow
import React, { PureComponent } from 'react'
import { View, Platform, ActivityIndicator } from 'react-native'
import * as Progress from 'react-native-progress'

export class Loading extends PureComponent {
    static defaultProps = {
        color: 'white',
        style: {},
        size: 'large',
        fill: true,
        useNative: false
    }

    props: {
        style: any,
        color: string,
        size: mixed,
        fill: bool,
        useNative: bool,
    }

    render() {
        const { style, color, size, fill, useNative } = this.props
        const sizeValue = (size === 'large' || size === 1) ? 36 : 24

        const styles = []
        fill && styles.push({flex: 1, position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center'})
        styles.concat(style)

        return (
            <View style={styles}>
                {(Platform.OS === 'ios' && !useNative) ? (
                    <Progress.CircleSnail
                        size={sizeValue}
                        color={color}
                        indeterminate
                        spinDuration={2000}
                    />
                ) : (
                    <ActivityIndicator
                        size={size}
                        color={color}
                    />
                )}
            </View>
        )
    }
}
