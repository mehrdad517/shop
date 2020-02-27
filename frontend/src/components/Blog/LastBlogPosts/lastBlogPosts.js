import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '../box';
import Line from '../../Line';

class LastBlogPosts extends Component {
  render() {
    return (
        <Grid spacing={3} container>
          <Grid item xs={12}>
            <Line title="آخرین مطالب وبلاگ" link="/blog" />
          </Grid>
          {this.props.data.map((item, index) => {
              return (
                <Grid item key={index} xs={12} sm={6}>
                  <Box item={item} />
                </Grid>
              );
            })}
        </Grid>
    );
  }
}

export default LastBlogPosts;
