const Utils = {
  /***
   * Converts a uPOKT value to POKT
   **/
  toPOKT: (balance) => balance ? balance/1000000 : 0,
}

const MessageTypes = {
  AppStake: {
    action: "AppStake",
    keys: ["apps/MsgAppStake", "/x.apps.MsgProtoStake"],
    actor: { name: "App", value: (msgValue) => msgValue.pubkey.value },
    subject: { name: "Chains", value: (msgValue) => msgValue.chains },
    object: { name: "Amount", value: (msgValue) => Utils.toPOKT(msgValue.amount) },
  },
  AppUnstake: {
    action: "AppUnstake",
    keys: ["apps/MsgAppBeginUnstake", "/x.appsMsgBeginUnstake"],
    actor: { name: "App", value: (msgValue) => msgValue.application_address },
  },
  AppUnjail: {
    action: "AppUnjail",
    keys: ["apps/MsgAppUnjail", "/x.nodes.MsgUnjail"],
    actor: { name: "Node", value: (msgValue) => msgValue.address },
  },
  NodeStake: {
    action: "NodeStake",
    keys: ["pos/MsgStake", "/x.nodes.MsgProtoStake"],
    actor: { name: "Node", value: (msgValue) => msgValue.public_key.value },
    subject: { name: "Chains", value: (msgValue) => msgValue.chains },
    object: { name: "Amount", value: (msgValue) => Utils.toPOKT(msgValue.value) },
  },
  NodeUnstake: {
    action: "NodeUnstake",
    keys: ["pos/MsgBeginUnstake", "/x.nodes.MsgBeginUnstake"],
    actor: { name: "Node", value: (msgValue) => msgValue.validator_address }
  },
  NodeUnjail: {
    action: "NodeUnjail",
    keys: ["pos/MsgUnjail", "/x.nodes.MsgUnjail"],
    actor: { name: "Node", value: (msgValue) => msgValue.address },
  },
  Send: {
    action: "Send",
    keys: ["pos/Send", "/x.nodes.MsgSend"],
    actor: { name: "From", value: (msgValue) => msgValue.from_address },
    subject: { name: "To", value: (msgValue) => msgValue.to_address },
    object: { name: "Amount", value: (msgValue) => Utils.toPOKT(msgValue.amount) },
  },
  Claim: {
    action: "Claim",
    keys: ["pocketcore/claim"],
    actor: { name: "Address", value: (msgValue) => msgValue.from_address },
    subject: { name: "App", value: (msgValue) => msgValue.header.app_public_key },
    object: { name: "Chain", value: (msgValue) => msgValue.header.chain },
  },
  Proof: {
    action: "Proof/Relay",
    keys: ["pocketcore/proof", "pocketcore/relay_proof"],
    actor: { name: "Servicer", value: (msgValue) => msgValue.leaf.value.servicer_pub_key },
    subject: { name: "App", value: (msgValue) => msgValue.leaf.value.aat.app_pub_key },
    object: { name: "Blockchain", value: (msgValue) => msgValue.leaf.value.blockchain },
  },
}

export class TxMessage {
  constructor(msg) {
    this.original = msg;
    this.rendered = {}

    this.render();
  }

  render() {
    Object.keys(MessageTypes).forEach(
      (type) => {
        if (MessageTypes[type].keys.includes(this.original.type)) {
          this.rendered.action = MessageTypes[type].action;
          if (MessageTypes[type].actor) {
            this.rendered.actor = {
              name: MessageTypes[type].actor.name,
              value: MessageTypes[type].actor.value(this.original.value),
            };
          }
          if (MessageTypes[type].subject) {
            this.rendered.subject = {
              name: MessageTypes[type].subject.name,
              value: MessageTypes[type].subject.value(this.original.value),
            };
          }
          if (MessageTypes[type].object) {
            this.rendered.object = {
              name: MessageTypes[type].object.name,
              value: MessageTypes[type].object.value(this.original.value),
            };
          }
      }
    })
  }
}
