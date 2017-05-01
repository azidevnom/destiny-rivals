import { setStateAsync } from './State';
import Api from './Api';

async function addNewGuardian(that, data, platform) {
  await setStateAsync(that, { searchBoxValue: '' });

  const isTextEmpty = (data.trim().length === 0);
  const isGuardianAlreadyRegistered = that.state.guardians.filter(item => (
    ((item.displayName.toLowerCase() === data.toLowerCase()) && (item.membershipType.toString() === platform))
  )).length > 0;

  if (isTextEmpty) return null;
  if (isGuardianAlreadyRegistered) return alert(`Guardian ${data} is already registered.`);

  const searchRequest = new Request(Api.resources.search(platform, data), Api.config);

  const searchResponse = await fetch(searchRequest).then(r => r.json());
  const responseHasContent = (searchResponse.Response.length > 0);
  const responseHasGuardian = (searchResponse.ErrorCode === 1);

  if (!(responseHasGuardian && responseHasContent)) return alert(`Guardian not found ${data} ${platform}`);

  const guardian = searchResponse.Response[0];
  await setStateAsync(that, {
    guardians: [...that.state.guardians, guardian]
  });

  const statsRequest = new Request(Api.resources.stats(guardian.membershipType, guardian.membershipId), Api.config);

  const statsResponse = await fetch(statsRequest).then(r => r.json());
  await setStateAsync(that, {
    guardiansData: {
      ...that.state.guardiansData,
      [guardian.displayName]: statsResponse.Response.mergedAllCharacters.results.allPvP.allTime
    },
    enableResults: true
  });

  const isComboDataNeeded = (Object.keys(that.state.guardiansData).length === 1);

  if (isComboDataNeeded) {
    const firstGuardian = Object.keys(that.state.guardiansData)[0];
    const comboKeys = Object.keys(that.state.guardiansData[firstGuardian])
    .sort((a, b) => (a > b ? 1 : -1));

    // removing unused entries
    comboKeys.splice(comboKeys.indexOf('weaponBestType'), 1);
    comboKeys.splice(comboKeys.indexOf('weaponKillsSubmachinegun'), 1);
    comboKeys.splice(comboKeys.indexOf('averageDeathDistance'), 1);
    comboKeys.splice(comboKeys.indexOf('totalDeathDistance'), 1);

    await setStateAsync(that, { comboData: comboKeys });
  }

  generateChart(that);
}

function generateChart(that) {
  let dataArray = Object.keys(that.state.guardiansData).map(g => (
    {
      name: g,
      value: that.state.guardiansData[g][that.state.comboValue].basic.value
    }
  ));
  dataArray = dataArray.sort((a, b) => b.value - a.value);
  that.setState({ chartData: dataArray });
}

export { addNewGuardian, generateChart };
