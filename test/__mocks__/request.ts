import { expect } from 'chai';

export function request (client: any, func: string, args: Array<any>) {
  return new Promise((resolve, reject) => {
    client[func](...args, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export function assertHelper (code: string, message: string, value: string, confirm = undefined): (data: any) => void {
  return (data: any) => {
    expect(data.code).to.be.equal(code);
    expect(data.message).to.be.equal(message);
    expect(data.value).to.be.equal(value);
    if (confirm) {
      expect(data.confirm).to.be.equal(confirm);
    }
  };
}

export function assertHelperData (data: any): (data: any) => void {
  return (data: any) => {
    expect(data).to.be.equal(data);
  };
}

export default request;
