import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import StyleWrapper from './footer.style';
import { FooterMenu } from '../index';

function Footer(props) {
  const [sub, setSub] = useState(150);
  return (
    <StyleWrapper>
      <div className="Footer">
        {props.setting.readyStatus === 'success' && (
          <Container>
            <Grid className="FooterTop" container>
              <Grid item lg={9} md={9} sm={6} xs={12}>
                <div className="FooterParagraph">
                  <p
                    style={{
                      maxHeight: sub,
                      overflow: sub === 150 && 'hidden'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: props.setting.data.domain.introduce
                    }}
                  />
                  <span
                    className="loadMore"
                    onClick={() => setSub(sub === 150 ? 2000 : 150)}
                  >
                    {sub === 150 ? 'بیشتر' : 'بستن'}
                  </span>
                </div>
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <div className="FooterImg">
                  <ul>
                    {props.setting.data.domain.links &&
                      props.setting.data.domain.links.map((s, index) => {
                        if (s.type === 'license') {
                          return (
                            <li key={index}>
                              <a href={s.value} target="_blank">
                                <img
                                  src={require(`../../static/Img/license/${s.id}.png`)}
                                />
                              </a>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              </Grid>
            </Grid>
            <Grid style={{ marginTop: '5px' }} container spacing={5}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {props.setting.data.footer_menu && (
                  <FooterMenu nodes={props.setting.data.footer_menu} />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <h4>پل های ارتباطی</h4>
                <ul className="contact">
                  {props.setting.data.domain.links.map((contact, index) => {
                    if (contact.type === 'contact') {
                      return (
                        <li key={index}>
                          <b>{contact.title}</b>:&nbsp;{contact.value}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <div className="network">
                  <h4>دانلود اپلیکیشن اندروید و آی او آس</h4>
                  <div className="App">
                    <ul>
                      {props.setting.data.domain.links &&
                        props.setting.data.domain.links.map((s, index) => {
                          if (s.type === 'app') {
                            return (
                              <li key={index}>
                                <a href={s.value} target="_blank">
                                  <img
                                    src={require(`../../static/Img/app/${s.id}.png`)}
                                  />
                                </a>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                </div>
                <div className="network">
                  <h4>شبکه های اجتماعی</h4>
                  <ul className="networkImg">
                    {props.setting.data.domain.links &&
                      props.setting.data.domain.links.map((s, index) => {
                        if (s.type === 'social') {
                          return (
                            <li key={index}>
                              <a href={s.value} target="_blank">
                                <img
                                  src={require(`../../static/Img/social/${s.id}.png`)}
                                />
                              </a>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12} xs={12}>
                <div className="FooterDown">
                  <p>{props.setting && props.setting.data.copy_right}</p>
                  <p>
                    {'Copyright © '}
                    <span style={{ fontFamily: 'tahoma' }}>
                      {' '}
                      {new Date().getFullYear()}
                    </span>
                  </p>
                </div>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    </StyleWrapper>
  );
}

export default Footer;
