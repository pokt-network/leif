import styled, { css } from "styled-components";
import { maxPhone, tablet } from "../../utils/media";
import { colors } from '../../utils/colors'; 

const StyledLi = styled.li`
  display: inline-block;
  text-align: center;
  padding: 15px 25px;
  ${maxPhone(css`
    display: block;
    padding: 25px;
    text-align: left;
    &:last-of-type {
      a {
        color: ${colors.white};        
      }
    }
  `)};
  a {
    font-weight: 300;
    font-size: 14px;
    color: ${colors.black};
    text-decoration: none;
    ${maxPhone(css`
      display: block;
      text-align: left;
      color: ${colors.white};
      font-size: 20px;
      line-height: 1.5;  
      display: initial;
      &.active {
        border-bottom: 1px solid ${colors.white} !important;
        padding-bottom: 2px !important;
      }
    `)};
    ${tablet(css`
      &:hover {
        color: ${colors.black};
      }
    `)};
    
    &:last-of-type{
      padding-right: 0;
      vertical-align: middle;
    }
    &.active {
      border-bottom: 1px solid ${colors.blue};
      padding-bottom: 3px;
    }
  }
  &.sub_menu {
    font-weight: 700;
    color: ${colors.blue};
    img {
      width: 8px;
      transform: rotate(90deg);
      margin-left: 8px;
    }
  }
  ul {
    position: absolute;
    height: 110px;
    width: 250px;
    top: 52px;
    left: 0px;
    display: none;
    ${maxPhone(css`
      display: block;
      position: relative;
      top: initial;
      left: initial;
      list-style-type: none;
      padding-left: 15px;
      margin-top: 5px;
      li {
        text-align: left;
        padding: 15px 15px;
        a {
          text-decoration: none;
          font-size: 18px;
        }
      }
    `)};
  }
  ${tablet(css`
    &:hover {
      ul {
        display: block;
        right: 20px;
        left: initial;
        top: 40px;
        z-index: 99999;
        list-style-type: none;
        border: none;
        padding-left: 0;
        background-color: ${colors.white};
        border-radius: 8px;
        box-shadow: 0 6px 25px -8px rgba(0, 0, 0, 0.5);
        height: initial;
        width: initial;
        padding: 10px 0;
        li {
          padding: 8px 25px;
          text-align: left;
          &:hover {
            background-color: ${colors.blue};
            span {
              color: ${colors.white};
            }
            a {
              &.active {
                border-bottom: 1px solid ${colors.white};
              }
            }
          }
          a {
            text-decoration: none;
            color: ${colors.black};
            font-size: 14px;
            span {
              color: ${colors.blue};
              margin-right: 2px;
            }
          }
        }
      }
    }
  `)};
`;

export default StyledLi;