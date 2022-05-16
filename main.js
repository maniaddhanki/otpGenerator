const { createTag, createAttribute, link } = require('../../htmlGenerator/tagAndAttributes.js');

const fs = require('fs');

const generateOtp = () => Math.ceil(Math.random() * 900000) + 99999;

const otpBlock = () => {
  const otp = '' + generateOtp();
  const divs = [].map.call(otp, number => {
    const attribute = createAttribute('class', 'otp');
    return createTag('div', number, attribute);
  });
  return divs.join('');
};

const generateHead = function () {
  const title = createTag('title', 'OTP');
  const linkTag = link('./styles.css');
  const head = createTag('head', title + linkTag);
  return head;
};

const generateBody = function () {
  const heading = createTag('h1', 'One Time Password Generator');
  const otp = otpBlock();
  const numberContainer = createTag('div', otp, createAttribute('class', 'numberContainer'));
  const message = createTag('p', '*refresh for new otp*', createAttribute('class', 'message'));
  const pageContainer = createTag('div', heading + numberContainer + message, createAttribute('class', 'container'));
  const body = createTag('body', pageContainer);
  return body;
};

const otpPage = function () {
  const head = generateHead();
  const body = generateBody();
  const html = createTag('html', head + body);
  return html;
};

fs.writeFileSync('otpPage.html', otpPage(), 'utf-8');
