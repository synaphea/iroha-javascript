import * as iroha from '../../src/irohajs';
import { IrohaGrpcFormat } from '../../src/grpc/utils';

import { expect } from 'chai';

describe('TEST Iroha gRPC Client', () => {
  beforeEach((done) => {
    done();
  });

  describe('Client Test Case', () => {
    it('Test not initialized service!', () => {
      const service = new iroha.IrohaService();
      service.rpc = null;
      expect(function () { let repo = service.AssetRepository; }).to.throw();
    });

    it('Test not initialized service!', () => {
      const service = new iroha.IrohaService(iroha.IrohaService.DefaultIrohaConfiguration);
      expect(service).to.be.not.null('');
    });

    it('Test Flatbuffer format!', () => {
      const options = {
        hostname: 'localhost',
        rest: {
          port: 1204
        },
        grpc: {
          port: 50051,
          format: IrohaGrpcFormat.Flatbuffers
        }
      };

      expect(function () { const service = new iroha.IrohaService(options); }).to.throws();
    });

    it('Test gRPC get URI', () => {
      const service = new iroha.IrohaService();
      expect(service.getGrpcBaseUrl()).to.be.equal('localhost:50051');
    });

    it('Test REST get URI', () => {
      const service = new iroha.IrohaService();
      expect(service.getRestBaseUrl()).to.be.equal('localhost:1204');
    });

  });
});
