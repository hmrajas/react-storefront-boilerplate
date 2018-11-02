import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, Hidden } from '@material-ui/core'
import { Skeleton, BlankRow, Row, Space, Content, ImageSwitcher } from 'react-storefront/Skeleton'
import { Header, styles } from './Product'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import Container from 'react-storefront/Container'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import classnames from 'classnames'
import QuantitySelector from 'react-storefront/QuantitySelector'
import Typography from '@material-ui/core/Typography'
import AddToCartButton from 'react-storefront/AddToCartButton'

@withStyles(theme => ({
  ...styles(theme),
  imageSwitcherNoMargin: {
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      margin: `0 -${theme.margins.container}px`
    }
  },
  color: {
    height: '46px',
    width: '46px'
  },
  size: {
    height: '40px',
    width: '60px'
  }
}))
@inject(({ app }) => ({ product: app.loadingProduct }))
@withWidth()
@observer
export default class ProductSkeleton extends Component {
  render() {
    let { product, classes, width } = this.props

    if (!product) product = {}

    return (
      <div>
        <Breadcrumbs/>
        <Container>
          <Hidden smUp implementation="css">
            <Header product={product}/>
          </Hidden>
          <Skeleton>
            <Hidden xsDown implementation="css">
              <BlankRow/>
            </Hidden>
            <div className={classes.mainContainer} style={{ alignItems: 'stretch' }}>
              <Row alignItems="stretch">
                <div>
                  <ImageSwitcher 
                    classes={{ 
                      root: classnames(classes.imageSwitcher, classes.imageSwitcherNoMargin) 
                    }} 
                    product={product}
                  />
                  <BlankRow/>
                </div>
                { isWidthDown('xs', width) ? null : (
                  <Space width="30px" height="auto"/> 
                )}
              </Row>
              <div className={classes.selectionControls} style={{ display: 'flex', flexDirection: 'column' }}>
                <Hidden xsDown implementation="css">
                  <Content>
                    <Header product={product}/>
                  </Content>
                </Hidden>
                <Row>
                  <Content>
                    <Typography variant="body1">Color</Typography>
                  </Content>
                  <Space flex="1"/>
                </Row>
                <BlankRow height="10px"/>
                <Row>
                  <Content className={classes.color}/>
                  <Space width="10px"/>
                  <Content className={classes.color}/>
                  <Space width="10px"/>
                  <Content className={classes.color}/>
                  <Space flex="1"/>
                </Row>
                <BlankRow height="45px"/>
                <Row>
                  <Content>
                    <Typography variant="body1">Size</Typography>
                  </Content>
                  <Space flex="1"/>
                </Row>
                <BlankRow height="10px"/>
                <Row>
                  <Content className={classes.size}/>
                  <Space width="10px"/>
                  <Content className={classes.size}/>
                  <Space width="10px"/>
                  <Content className={classes.size}/>
                  <Space width="10px"/>
                  <Content className={classes.size}/>
                  <Space width="10px"/>
                  <Content className={classes.size}/>
                  <Space flex="1"/>
                </Row>
                <BlankRow/>
                <Row>
                  <Content>
                    <Typography variant="body1" style={{paddingRight: 15}}>Quantity:</Typography>
                  </Content>
                  <QuantitySelector product={product}/>
                  <Space flex="1"/>
                </Row>
                <BlankRow/>
                <Row>
                  <Content>
                    <AddToCartButton disabled/>
                  </Content>
                  <Space flex="1"/>
                </Row>
                <BlankRow flex="1"/>
              </div>
            </div>
          </Skeleton>
        </Container>
      </div>
    )
  }
}