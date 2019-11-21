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
        return `生成 ${effectPlain()} 点 ops 资源。`;

      case "OPERATE_SPAWN":
        return `减少 ${effectPercent()} 的孵化时间。`;

      case "OPERATE_TOWER":
        return `提升 ${effectPercent()} 的攻击、修理或治疗效果。`;

      case "OPERATE_STORAGE":
        return `提升 ${effectMetric()} 单位的存储容量。`;

      case "OPERATE_LAB":
        return `增加 ${effectMetric()} 单位的反应产物。`;

      case "OPERATE_EXTENSION":
        return `使用目标建筑（container、storage 或者 terminal）中的能量，立刻填充房间中 ${effect100()}% 的 extension。`;

      case "OPERATE_OBSERVER":
        return `给予无限视野范围。`;

      case "OPERATE_TERMINAL":
        return `将资源转移的能量消耗和冷却时间降低 ${effectPercent()}。`;

      case "DISRUPT_SPAWN":
        return `暂停孵化进程。`;

      case "DISRUPT_TOWER":
        return `削弱 ${effectPercent()} 的效果。`;

      case "DISRUPT_SOURCE":
        return `暂停 Source 的能量再生。`;

      case "SHIELD":
        return `在其所在地块上创建一个拥有 ${effectMetric()} 点生命值、无法修复的临时 rampart。如果该地块已有 rampart 则无法使用。消耗 ${powerInfo.energy} 点能量。`;

      case "REGEN_SOURCE":
        return `使 Source 每 ${powerInfo.period} tick 重新生成 ${effectMetric()} 点能量。`;

      case "REGEN_MINERAL":
        return `使矿藏每 ${powerInfo.period} tick 增加 ${effectMetric()} 点矿物。`;

      case "DISRUPT_TERMINAL":
        return `阻止从 terminal 中取出资源。`;

      case "FORTIFY":
        return `使得一个 wall 或者 rampart 免疫所以来自 creep 的伤害和 power 的效果。`;

      case "OPERATE_POWER":
        return `将 Power Spawn 的 power 处理速度提升  ${effectMetric()} 单位每秒。`;

      case "OPERATE_CONTROLLER":
        return `将一个 8 级 Controller 的每 tick 升级能量上限提高 ${effectMetric()} 单位。`;

      case "OPERATE_FACTORY":
        return `将 factory 的等级设置为该 power 的等级。该操作无法撤销，并且一旦设置无法修改为其他等级。持续时间结束后再次使用相同的 power 即可恢复效果。`;
    }
  }

  function duration() {
    if(!powerInfo.duration) {
      return '';
    }
    if(powerInfo.duration.length) {
      return '效果持续 '+powerInfo.duration.join('/')+' tick。';
    }
    return '效果持续 '+powerInfo.duration+' tick。';
  }

  function cooldown() {
    if(powerInfo.cooldown === 0) {
      return '无冷却。';
    }
    return '冷却 '+powerInfo.cooldown+' tick。';
  }

  function range() {
    if(powerInfo.range) {
      return '范围 '+powerInfo.range+' 格以内。';
    }
    return '';
  }

  function ops() {
    if(!powerInfo.ops) {
      return '';
    }
    if(powerInfo.ops.length) {
      return '消耗 '+powerInfo.ops.join('/')+' 点 ops 资源。';
    }
    return '消耗 '+powerInfo.ops+' 点 ops 资源。';
  }

  function level() {
    return 'creep 等级要求: '+powerInfo.level.join('/')+'.';
  }

  return `${description()}${duration()}${cooldown()}${range()}${ops()}${level()}`;

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
    result += `<tr><td style="background: #141414; width: 50px; padding: 0; border-top: 1px solid #444">
        <img src="https://screeps.com/a/app2/assets/powers/${className}/${powerName.toLowerCase().replace(/_/g,'-')}.svg">
        </td>
        <th>${powerName}</th>
        <td>${powerDescription(powerName)}</td>
        </tr>`;
  }

  result += '</table>';
  return result;
}, {async: false});