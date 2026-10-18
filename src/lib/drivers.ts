// The 8-factor fatigue model, one entry per factor. Each finding names its study type so the strength of the evidence is visible.
// Citations match the references on the Sources page.

export interface Finding {
  text: string;
  kind: string;
}

export interface Driver {
  id: string;
  label: string;
  /** What the factor covers, in the model's own words. */
  covers: string;
  title: string;
  findings: Finding[];
}

export const DRIVERS: Driver[] = [
  {
    id: 'sleep',
    label: 'Sleep & recovery',
    covers: 'Quality, quantity and opportunity to recover.',
    title: 'Time awake and lost sleep build impairment',
    findings: [
      { text: 'After 17 hours awake, performance on a hand-eye coordination task matched a blood alcohol level of 0.05%. After 24 hours it matched about 0.10% (Dawson & Reid, 1997).', kind: 'Experiment, 40 adults' },
      { text: 'Night workers’ day sleep is often lighter, shorter and more easily disturbed, which can build a sleep debt (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'Proper work and rest scheduling and good sleep habits are of primary importance for managing alertness (Caldwell et al., 2008).', kind: 'Review' },
      { text: 'Employer programmes to improve sleep are mostly education. Most report better self-reported sleep, but the evidence is weak (Redeker et al., 2019).', kind: 'Systematic review' },
      { text: 'Most of 55 experts agreed that standard sleep hygiene advice needs tailoring for shift workers, in part because it can contradict fatigue management advice such as daytime napping. They agreed 18 tailored practices, which have not yet been tested for effectiveness (Shriane et al., 2023).', kind: 'Expert consensus (Delphi)' },
    ],
  },
  {
    id: 'cognitive',
    label: 'Cognitive demand',
    covers: 'Concentration, decision-making, task switching.',
    title: 'The work itself can tire people, not just when it happens',
    findings: [
      { text: 'Workers are more easily fatigued when their work is machine-paced, complex or monotonous (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'In shift workers, time-of-day effects on performance were larger in the more demanding task conditions. Accuracy at 03:00 fell most on the hardest version of a discrimination task (Galy et al., 2008).', kind: 'Study of shift workers' },
      { text: 'Switching from one task to another consistently slows reaction times and raises the chance of errors straight after the switch (Hinss et al., 2023, summarising earlier task-switching research).', kind: 'Background from a registered report protocol' },
      { text: 'In 34 healthy adults, task switching got worse the longer they worked on the task, mostly when working memory was also needed (Petruo et al., 2018).', kind: 'Experiment, 34 adults' },
      { text: 'Even after allowing for time of day and hours awake, performance was better when ratings of alertness and motivation were higher (Hull et al., 2003).', kind: 'Laboratory study, 15 adults' },
    ],
  },
  {
    id: 'coordination',
    label: 'Coordination & clarity',
    covers: 'Unclear information, conflicting priorities, conflicting instructions, poor handovers.',
    title: 'Handovers depend on clear information and a calm setting',
    findings: [
      { text: 'In critical care nurses, intrusions and distractions were linked to poorer handover quality. Standardised handover tools and training were named as facilitators (Abou Hashish et al., 2023).', kind: 'Survey of 201 nurses' },
      { text: 'In shift workers, recall at 07:00 and 11:00 was better for information processed in depth as it was taken in (Galy et al., 2008).', kind: 'Study of shift workers' },
      { text: 'A review of hybrid work leadership argues that unclear expectations and the lack of shared norms on responsiveness and availability undermine coordination in dispersed teams (Sharma et al., 2025).', kind: 'Conceptual review, not empirical' },
    ],
  },
  {
    id: 'workload',
    label: 'Workload & staffing',
    covers: 'Too much work for the capacity available.',
    title: 'Too much work for the people available',
    findings: [
      { text: 'Workload is one of the key risk factors to assess in shift work. Problems with overtime and shift-swapping may point to inadequate resourcing and staffing levels (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'In critical care nurses, staffing was linked to better handover quality. Time stress, and acute and chronic fatigue, were linked to poorer handover quality (Abou Hashish et al., 2023).', kind: 'Survey of 201 nurses' },
      { text: 'Reductions in working time were consistently associated with lower burnout, less sickness absence and better retention in healthcare, with organisational performance maintained or improved (Whelehan & Ridgway, 2026).', kind: 'Integrative review' },
    ],
  },
  {
    id: 'emotional',
    label: 'Emotional demands',
    covers: 'High pressure, customer facing, care, trauma exposure.',
    title: 'Anxiety and pressure affect safety-critical communication',
    findings: [
      { text: 'In critical care nurses, anxiety and time stress were linked to poorer handover quality (Abou Hashish et al., 2023).', kind: 'Survey of 201 nurses' },
      { text: 'In a study of 96 ward nurses, momentary fatigue was explained by the task being done, how demanding and rewarding it felt, and the nurse’s level of emotional exhaustion (Fernández-Castro et al., 2017).', kind: 'Cohort study, 96 nurses' },
    ],
  },
  {
    id: 'patterns',
    label: 'Working patterns',
    covers: 'Shifts, on-call, overtime, unpredictability.',
    title: 'Night work, long shifts and long weeks carry measurable risk',
    findings: [
      { text: 'Injury risk was about 36% higher on night shifts than on morning shifts, and about 36% higher by the fourth night in a block than on the first (Fischer et al., 2017).', kind: 'Meta-analysis' },
      { text: 'Injury risk was higher on shifts longer than 12 hours (relative risk 1.34), and highest when rest breaks came less often than every four hours or lasted under 30 minutes (Fischer et al., 2017).', kind: 'Meta-analysis' },
      { text: 'Working more than 12 hours a day was linked to a higher risk of safety incidents (relative risk 1.24), though the certainty of the evidence was low (Matre et al., 2021).', kind: 'Meta-analysis, low certainty' },
      { text: 'An estimated 488 million people, 8.9% of the world population, worked 55 hours or more a week in 2016. Long hours were linked to an estimated 745,194 deaths from heart disease and stroke (Pega et al., 2021).', kind: 'WHO/ILO modelling' },
      { text: 'Comparisons of 8-hour and 12-hour shifts showed no clear advantage either way, and the evidence quality was low (Patterson et al., 2018).', kind: 'Systematic review, low quality' },
      { text: 'In a randomised trial across 66 hospital units, a schedule that halved short daily rest periods (under 11 hours between shifts) led to a smaller rise in sickness absence days than the usual schedule (incidence rate ratio 0.56) (Djupedal et al., 2025).', kind: 'Cluster randomised trial, 811 workers' },
      { text: 'In interviews with 55 night-shift union members, recovery time after nights was often not built into rosters and ate into days off (Moore & Ballardie, 2024).', kind: 'Interviews, 55 workers' },
      { text: 'Workers often drove home after night shifts, some for over two hours, and reported traffic accidents or near misses (Moore & Ballardie, 2024).', kind: 'Interviews, 55 workers' },
      { text: 'Intensive care nurses in Cambodia working 24-hour shifts described exhaustion and care left undone (Koy et al., 2020).', kind: 'Focus groups, 30 nurses' },
    ],
  },
  {
    id: 'physical',
    label: 'Physical demands',
    covers: 'Repetitive, strenuous or prolonged activity.',
    title: 'Physical effort is part of the picture',
    findings: [
      { text: 'Fatigue is generally considered a decline in mental or physical performance that results from prolonged exertion, sleep loss or disruption of the internal clock (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'Fatigue involves physical, mental and muscular dimensions, which are largely influenced by the timing of work schedules (Fischer et al., 2017).', kind: 'Meta-analysis' },
      { text: 'Among 251 offshore workers, physical fatigue was linked only to physical demands such as awkward postures and heavy lifting, while mental fatigue was linked to both physical and psychological demands, including task interruptions and excessive work (Bazazan et al., 2023).', kind: 'Cross-sectional, 251 workers' },
      { text: 'A mini review of running coordination proposes that fatigue and accumulated overuse compromise coordination, so mechanical stress falls on fewer components (Kiely, 2017).', kind: 'Mini review, running' },
      { text: 'In 12 healthy men doing repetitive lifting, a 31% fall in lifting power came with changed movement patterns and declining postural stability (Sparto et al., 1997).', kind: 'Lab study, 12 men' },
    ],
  },
  {
    id: 'culture',
    label: 'Culture & management',
    covers: 'Psychological safety, support, ability to speak up.',
    title: 'How people are led shapes how safely they can work',
    findings: [
      { text: 'Management issues and employee welfare can contribute to the risks of shift work, alongside shift timing, duration and breaks (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'In critical care nurses, a positive safety climate and good relationships were linked to better handover quality (Abou Hashish et al., 2023).', kind: 'Survey of 201 nurses' },
      { text: 'A mindfulness-based programme for supervisors lowered the supervisors’ own sick days, but did not change their employees’ sick days (Vonderlin et al., 2023). The study had only 13 supervisors.', kind: 'Quasi-experimental study' },
      { text: 'Georgia’s current research looks at how leadership behaviours support engagement, motivation, psychological safety and confidence during AI-related change in small and medium-sized enterprises.', kind: 'In progress' },
    ],
  },
];
