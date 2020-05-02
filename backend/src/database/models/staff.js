const types = require('./types');
const AbstractEntityModel = require('./abstractEntityModel');

module.exports = class Staff extends AbstractEntityModel {
  constructor() {
    super('staff', 'staff', {
      staffProfile: new types.Files(),
      staffNames: new types.String(null, null),
      staffUserId: new types.RelationToOne(),
      staffPhoneNumber: new types.String(null, null),
      staffCommision: new types.Number(0, 100),
      staffDateOfBirth: new types.Date(),
      staffMaritalStatus: new types.Enumerator([
        "phongban1",
        "phongban2",
        "phongban3",
        "phongban4"
      ]),
      // staffAbout: new types.String(null, null),
      // staffCustomInfo: new types.String(null, null),
      // staffCv: new types.Files(),
      // staffDocuments: new types.Files(),
      // staffIsAServiceWorker: new types.Enumerator([
      //   "yes",
      //   "no"
      // ]),
      // staffIdentityCard: new types.String(null, null),
      // staffAccessApps: new types.Enumerator([
      //   "Enabled",
      //   "Disabled"
      // ]),
      // importHash: new types.String(null, 255),
    });
  }
};
