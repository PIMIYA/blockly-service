/**
 * 描述此函式...
 */
function run(constValue, runtimeValue, ledManager) {
  if (ledManager.getButtonStatus(1,1) != 0) {
    ledManager.setLed(3,3,"#0000c6");
  }
}

module.exports = {
    run: run
};
