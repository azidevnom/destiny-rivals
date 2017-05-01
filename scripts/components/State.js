export default {
  platformSelected: '2',
  searchBoxValue: '',
  comboValue: 'abilityKills',
  comboData: [],
  enableResults: false,
  guardians: [],
  guardiansData: {},
  chartData: []
};

export function setStateAsync(that, newState) {
  return new Promise((resolve) => {
    that.setState(newState, () => {
      resolve();
    });
  });
}
