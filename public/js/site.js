/* Georgia's PsyWork — site script
   One file for every page. Each feature looks for its own data-* hooks and does
   nothing when they are absent, so pages only pay for what they use.
   All markup is pre-rendered in the HTML; this file only adds interaction. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var isOn = function (el) { return el.getAttribute('aria-pressed') === 'true'; };

  /* Forms that are not wired to a backend yet: stop the page reloading. */
  function initNoSubmit() {
    $$('form[data-no-submit]').forEach(function (form) {
      form.addEventListener('submit', function (e) { e.preventDefault(); });
    });
  }

  /* Filter chips (articles, resources): show/hide pre-rendered items. */
  function initFilters() {
    $$('[data-filter-group]').forEach(function (group) {
      var chips = $$('[data-filter]', group);
      var items = $$('[data-filter-item]', group);
      var count = $('[data-filter-count]', group);
      var noun = group.getAttribute('data-noun');

      function apply(category) {
        var shown = 0;
        items.forEach(function (item) {
          var visible = category === 'All' || item.getAttribute('data-category') === category;
          item.hidden = !visible;
          if (visible) shown++;
        });
        chips.forEach(function (chip) {
          chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter') === category));
        });
        count.textContent = shown + ' ' + noun + (shown === 1 ? '' : 's');
      }

      chips.forEach(function (chip) {
        chip.addEventListener('click', function () { apply(chip.getAttribute('data-filter')); });
      });
    });
  }

  /* Home: tick-list of six symptoms. */
  var VERDICTS = [
    'Tick whichever ones land. Nothing here is recorded.',
    'One is common in any shift operation. Worth keeping an eye on.',
    'Two usually share a cause in how the work is designed.',
    'Three is a pattern, not bad luck. A conversation would help name it.',
    "That's a fatigue risk worth looking at properly. It is fixable.",
    "That's a fatigue risk worth looking at properly. It is fixable.",
    'All six. None of it is unusual, and none of it is down to your people.'
  ];

  function initChecklist() {
    var rows = $$('[data-check]');
    if (!rows.length) return;
    var count = $('[data-checklist-count]');
    var verdict = $('[data-checklist-verdict]');

    function update() {
      var n = rows.filter(isOn).length;
      count.textContent = n;
      verdict.textContent = VERDICTS[n];
    }
    rows.forEach(function (row) {
      row.addEventListener('click', function () {
        row.setAttribute('aria-pressed', String(!isOn(row)));
        update();
      });
    });
  }

  /* Home: hours-awake slider. */
  function initAwake() {
    var input = $('[data-awake-input]');
    if (!input) return;
    var value = $('[data-awake-value]');
    var clock = $('[data-awake-clock]');
    var line = $('[data-awake-line]');

    function update() {
      var h = +input.value;
      value.textContent = h;
      clock.textContent = pad((7 + h) % 24) + ':00';
      line.textContent = h >= 24
        ? 'Performance comparable to a blood alcohol level of about 0.10%, above the drink-drive limit in England and Wales.'
        : h >= 17
          ? 'Performance comparable to a blood alcohol level of about 0.05%, the drink-drive limit in Scotland.'
          : 'Within the normal range for most people. Keep going.';
    }
    input.addEventListener('input', update);
  }

  /* Home: 24-hour alertness bars. */
  function phaseFor(h) {
    if (h >= 2 && h <= 5) return ['The circadian low', 'Alertness is at its lowest. This is when night shifts are asked to run checks, drive, and handle the unexpected.'];
    if (h === 6 || h === 7) return ['Handover', 'Tired people briefing people who have just woken up, often after a short changeover.'];
    if (h >= 8 && h <= 12) return ['Day shift, sharpest', 'Most decisions about rotas, overtime and cover get made in these hours, by people who are wide awake.'];
    if (h >= 13 && h <= 15) return ['The afternoon dip', 'A smaller drop, landing on earlies finishing and lates starting.'];
    if (h >= 16 && h <= 21) return ['Lates', 'Cover requests come in now, and they usually go to the same few willing people.'];
    return ['Nights begin', 'For many on the night shift, the working day starts after most of a day already awake.'];
  }

  function initAlertness() {
    var wrap = $('[data-alertness]');
    if (!wrap) return;
    var bars = $$('[data-hour]', wrap);
    var ticks = $$('[data-tick]', wrap);
    var label = $('[data-hour-label]');
    var phase = $('[data-hour-phase]');
    var line = $('[data-hour-line]');

    function select(h) {
      var p = phaseFor(h);
      bars.forEach(function (b, i) { b.classList.toggle('is-now', i === h); });
      ticks.forEach(function (t, i) { t.classList.toggle('is-now', i === h); });
      label.textContent = pad(h) + ':00';
      phase.textContent = p[0];
      line.textContent = p[1];
    }
    bars.forEach(function (bar) {
      bar.addEventListener('click', function () { select(+bar.getAttribute('data-hour')); });
    });
  }

  /* Contact: topic chips toggle, form swaps for a confirmation. */
  function initContact() {
    $$('[data-toggle-chip]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        chip.setAttribute('aria-pressed', String(!isOn(chip)));
      });
    });
    var form = $('[data-contact-form]');
    var sent = $('[data-contact-sent]');
    if (!form || !sent) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      sent.hidden = false;
    });
  }

  /* Rota builder: click a cell to cycle Off > E > L > N, flags recalculate. */
  var ROTA0 = ['EELLNN-', 'NNNN--E', 'LLE-NNN', '--EEEEE'];
  var CREW = ['Crew A', 'Crew B', 'Crew C', 'Crew D'];
  var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  var NEXT = { '-': 'E', E: 'L', L: 'N', N: '-' };
  var SHIFT = { E: { s: 6, h: '06–14' }, L: { s: 14, h: '14–22' }, N: { s: 22, h: '22–06' } };

  function analyse(row) {
    var flags = Array(7).fill('');
    var nightsRun = 0, workRun = 0, nights = 0;
    for (var d = 0; d < 7; d++) {
      var c = row[d], p = d ? row[d - 1] : '-';
      if (c === '-') { nightsRun = 0; workRun = 0; continue; }
      workRun++;
      if (c === 'N') { nightsRun++; nights++; } else nightsRun = 0;
      if (p !== '-') {
        var endPrev = p === 'N' ? 6 : SHIFT[p].s + 8 - 24;
        var gap = SHIFT[c].s - endPrev;
        if (p === 'N' && c !== 'N') flags[d] = 'Quick return after nights';
        else if (gap < 11 && p !== c) flags[d] = 'Quick return: ' + Math.max(0, gap) + 'h rest';
      }
      if (!flags[d] && p !== '-' && ((p === 'L' && c === 'E') || (p === 'N' && c === 'L'))) flags[d] = 'Backward rotation';
      if (nightsRun > 3) flags[d] = 'Night ' + nightsRun + ' in a row';
      if (workRun > 5) flags[d] = workRun + ' days without rest';
    }
    var flagged = flags.filter(Boolean).length;
    return { flags: flags, score: Math.min(10, flagged * 2.5 + nights * 0.6) };
  }

  function initRota() {
    var root = $('[data-rota]');
    if (!root) return;
    var rowEls = $$('[data-rota-row]', root);
    var findingsEl = $('[data-findings]');
    var flagCountEl = $('[data-flag-count]');
    var cleanEl = $('[data-rota-clean]');
    var rota = ROTA0.slice();

    function render() {
      var findings = [];
      rowEls.forEach(function (rowEl, ri) {
        var res = analyse(rota[ri]);
        var level = res.score >= 6 ? 'High' : res.score >= 3 ? 'Watch' : 'Low';
        rowEl.setAttribute('data-level', level);
        $('.rota-fill', rowEl).style.setProperty('--pct', Math.round(res.score * 10) + '%');
        $('.rota-level', rowEl).textContent = level;
        $$('[data-cell]', rowEl).forEach(function (cell, d) {
          var c = rota[ri][d], flag = res.flags[d];
          cell.setAttribute('data-shift', c);
          cell.classList.toggle('is-flagged', !!flag);
          cell.title = flag;
          $('b', cell).textContent = c === '-' ? 'Off' : c;
          $('span', cell).textContent = c === '-' ? '' : SHIFT[c].h;
          if (flag) findings.push({ who: CREW[ri] + ', ' + DAYS[d], what: flag });
        });
      });
      findingsEl.textContent = '';
      findings.slice(0, 6).forEach(function (f) {
        var p = document.createElement('p');
        p.className = 'finding';
        var who = document.createElement('span');
        who.className = 'finding-who';
        who.textContent = f.who;
        p.appendChild(who);
        p.appendChild(document.createTextNode(' · ' + f.what));
        findingsEl.appendChild(p);
      });
      flagCountEl.textContent = findings.length + (findings.length === 1 ? ' flag' : ' flags');
      cleanEl.hidden = findings.length !== 0;
    }

    rowEls.forEach(function (rowEl, ri) {
      $$('[data-cell]', rowEl).forEach(function (cell, d) {
        cell.addEventListener('click', function () {
          var a = rota[ri].split('');
          a[d] = NEXT[a[d]];
          rota[ri] = a.join('');
          render();
        });
      });
    });
    $('[data-rota-reset]').addEventListener('click', function () {
      rota = ROTA0.slice();
      render();
    });
    render();
  }

  function init() {
    initNoSubmit();
    initFilters();
    initChecklist();
    initAwake();
    initAlertness();
    initContact();
    initRota();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
