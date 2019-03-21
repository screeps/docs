var util = require('hexo-util');
var constants = require('@screeps/common/lib/constants');

function powerDescription(powerName) {

  var powerInfo = constants.POWER_INFO[constants["PWR_"+powerName]];

  function effectPlain() {
    return powerInfo.effect.join('/');
  }
  function effectPercent() {
    return powerInfo.effect.map(value => {
      if (value < 1) {
        return Math.round(100 - 100 * value);
      } else if (value > 1) {
        return Math.round(100 * value - 100);
      } else {
        return '0%';
      }
    }).join('/')+'%</b>';
  }
  function effectMetric() {
    const METRICS = ['K', 'M', 'G'];
    return powerInfo.effect.map(value => {
      let i;

      if (value >= 1000) {
        value = value / 1000;
        i = 0;
      }

      if (value >= 1000) {
        value = value / 1000;
        i = 1;
      }

      if (value >= 1000) {
        value = value / 1000;
        i = 2;
      }

      return `${value}${METRICS[i] || ""}`;
    }).join('/');
  }
  function effect100() {
    return powerInfo.effect.map(value => value * 100).join('/');
  }

  function description() {

    switch (powerName) {

      case "GENERATE_OPS":
        return `Generate ${effectPlain()} ops resource units.`;

      case "OPERATE_SPAWN":
        return `Reduce spawn time by ${effectPercent()}.`;

      case "OPERATE_TOWER":
        return `Increase damage, repair and heal amount by ${effectPercent()}.`;

      case "OPERATE_STORAGE":
        return `Increase capacity by ${effectMetric()} units.`;

      case "OPERATE_LAB":
        return `Increase reaction amount by ${effectMetric()} units.`;

      case "OPERATE_EXTENSION":
        return `Instantly fill ${effect100()}% of all extensions in the room using energy from the target structure (container, storage, or terminal).`;

      case "OPERATE_OBSERVER":
        return `Grant unlimited range.`;

      case "OPERATE_TERMINAL":
        return `Decrease transfer energy cost and cooldown by ${effectPercent()}.`;

      case "DISRUPT_SPAWN":
        return `Pause spawning process.`;

      case "DISRUPT_TOWER":
        return `Reduce effectiveness by  ${effectPercent()}.`;

      case "DISRUPT_SOURCE":
        return `Pause energy regeneration.`;

      case "SHIELD":
        return `Create a temporary non-repairable rampart structure on the same square with ${effectMetric()} hits. Cannot be used on top of another rampart. Consumes ${powerInfo.energy} energy resource units.`;

      case "REGEN_SOURCE":
        return `Regenerate ${effectMetric()} energy units in a source every {{ powerInfo.period }} ticks.`;

      case "REGEN_MINERAL":
        return `Regenerate ${effectMetric()} mineral units in a deposit every {{ powerInfo.period }} ticks.`;

      case "DISRUPT_TERMINAL":
        return `Block withdrawing resources from the terminal.`;

      case "FORTIFY":
        return `Make a wall or rampart tile invulnerable to all creep attacks and powers.`;

      case "OPERATE_POWER":
        return `Increase power processing speed of a Power Spawn by ${effectMetric()} units per tick.`;

      case "OPERATE_CONTROLLER":
        return `Increase max limit of energy that can be used for upgrading a Level 8 Controller each tick by ${effectMetric()} energy units.`;

      case "OPERATE_FACTORY":
        return `An unknown power.`;
    }
  }

  function duration() {
    if(!powerInfo.duration) {
      return '';
    }
    if(powerInfo.duration.length) {
      return 'Effect duration '+powerInfo.duration.join('/')+' ticks.';
    }
    return 'Effect duration '+powerInfo.duration+' ticks.';
  }

  function cooldown() {
    if(powerInfo.cooldown === 0) {
      return 'No cooldown';
    }
    return 'Cooldown '+powerInfo.cooldown+' ticks.';
  }

  function range() {
    if(powerInfo.range) {
      return 'Range '+powerInfo.range+' squares.';
    }
    return '';
  }

  function ops() {
    if(!powerInfo.ops) {
      return '';
    }
    if(powerInfo.ops.length) {
      return 'Consumes '+powerInfo.ops.join('/')+' ops resource units.';
    }
    return 'Consumes '+powerInfo.ops+' ops resource units.';
  }

  function level() {
    return 'Required creep level: '+powerInfo.level.join('/')+'.';
  }

  return `${description()} ${duration()} ${cooldown()} ${range()} ${ops()} ${level()}`;

}




hexo.extend.tag.register('powers', function(args) {

  var result = '<table>';

  var className = args[0];

  for(var powerId in constants.POWER_INFO) {
    var powerInfo = constants.POWER_INFO[powerId];
    if(powerInfo.className != className) {
      continue;
    }
    var powerName;
    for(var name in constants) {
      if(constants[name] == powerId && name.indexOf('PWR_') === 0) {
        powerName = name.substring(4);
        break;
      }
    }
    result += `<tr><th>${powerName}</th><td>${powerDescription(powerName)}</td></tr>`;
  }

  result += '</table>';
  return result;
}, {async: false});