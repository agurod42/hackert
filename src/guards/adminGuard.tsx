import { Card, Col, Row } from 'antd';
import React from 'react';
import AuthService from '@/services/auth';

export default class AdminGuard extends React.Component {

  private authService: AuthService;

  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  
  async render() {
    return (
      this.props.children
    );
  }

}
