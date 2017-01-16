import React, {Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {Link} from 'react-router';

import {
  Page,
  Flex, FlexItem,
  Cards, CardBody, CardFooter,
} from '../../components/index';

export default class FlexTest extends React.Component {
  render() {
    return (
      <Page>
        <Flex>
          <FlexItem>
            <Cards>
              <CardBody>
                Flex/CardBody
              </CardBody>
              <CardFooter>
                Flex/CardFooter
              </CardFooter>
            </Cards>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem>
            <Cards>
              <CardBody>
                Flex/CardBody
              </CardBody>
              <CardFooter>
                Flex/CardFooter
              </CardFooter>
            </Cards>
          </FlexItem>
          <FlexItem>
            <Cards>
              <CardBody>
                Flex/CardBody
              </CardBody>
              <CardFooter>
                Flex/CardFooter
              </CardFooter>
            </Cards>
          </FlexItem>
        </Flex>
        <Flex>
          <FlexItem>
            <Cards>
              <CardBody>
                Flex/CB
              </CardBody>
              <CardFooter>
                Flex/CF
              </CardFooter>
            </Cards>
          </FlexItem>
          <FlexItem>
            <Cards>
              <CardBody>
                Flex/CB
              </CardBody>
              <CardFooter>
                Flex/CF
              </CardFooter>
            </Cards>
          </FlexItem>
          <FlexItem>
            <Cards>
              <CardBody>
                Flex/CB
              </CardBody>
              <CardFooter>
                Flex/CF
              </CardFooter>
            </Cards>
          </FlexItem>
        </Flex>
      </Page>
    );
  }
}