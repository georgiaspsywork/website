// "What drives fatigue" graphic: one entry per factor. Each finding names its study type so the strength of the evidence is visible.
// Citations match the references on the Sources page.

export interface Finding {
  text: string;
  kind: string;
}

export interface Driver {
  id: string;
  label: string;
  title: string;
  findings: Finding[];
}

export const DRIVERS: Driver[] = [
  {
    id: 'workload',
    label: 'Workload and task demands',
    title: 'The work itself can tire people, not just when it happens',
    findings: [
      { text: 'Workers are more easily fatigued when their work is machine-paced, complex or monotonous (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'In shift workers, time-of-day effects on performance were larger in the more demanding task conditions. Accuracy at 03:00 fell most on the hardest version of a discrimination task (Galy et al., 2008).', kind: 'Study of shift workers' },
    ],
  },
  {
    id: 'switching',
    label: 'Task switching',
    title: 'Switching between tasks has a cost, and time on task adds to it',
    findings: [
      { text: 'Switching from one task to another consistently slows reaction times and raises the chance of errors straight after the switch (Hinss et al., 2023, summarising earlier task-switching research).', kind: 'Background from a registered report protocol' },
      { text: 'In 34 healthy adults, task switching got worse the longer they worked on the task, mostly when working memory was also needed (Petruo et al., 2018).', kind: 'Experiment, 34 adults' },
    ],
  },
  {
    id: 'interruptions',
    label: 'Interruptions and time pressure',
    title: 'Distraction and time stress get in the way of safe handover',
    findings: [
      { text: 'In critical care nurses, intrusions, distractions, anxiety, time stress and both acute and chronic fatigue were each linked to poorer handover quality. Staffing and a positive safety climate were linked to better handover (Abou Hashish et al., 2023).', kind: 'Survey of 201 nurses' },
    ],
  },
  {
    id: 'hours',
    label: 'Long hours',
    title: 'Risk climbs as the hours add up',
    findings: [
      { text: 'Injury risk was higher on shifts longer than 12 hours (relative risk 1.34) (Fischer et al., 2017).', kind: 'Meta-analysis' },
      { text: 'Working more than 12 hours a day was linked to a higher risk of safety incidents (relative risk 1.24), though the certainty of the evidence was low (Matre et al., 2021).', kind: 'Meta-analysis, low certainty' },
      { text: 'An estimated 488 million people, 8.9% of the world population, worked 55 hours or more a week in 2016. Long hours were linked to an estimated 745,194 deaths from heart disease and stroke (Pega et al., 2021).', kind: 'WHO/ILO modelling' },
    ],
  },
  {
    id: 'sleep',
    label: 'Sleep loss',
    title: 'Time awake and lost sleep build impairment',
    findings: [
      { text: 'After 17 hours awake, performance on a hand-eye coordination task matched a blood alcohol level of 0.05%. After 24 hours it matched about 0.10% (Dawson & Reid, 1997).', kind: 'Experiment, 40 adults' },
      { text: 'Night workers’ day sleep is often lighter, shorter and more easily disturbed, which can build a sleep debt (HSE, n.d.).', kind: 'Regulator guidance' },
      { text: 'Employer programmes to improve sleep are mostly education. Most report better self-reported sleep, but the evidence is weak (Redeker et al., 2019).', kind: 'Systematic review' },
    ],
  },
  {
    id: 'breaks',
    label: 'Breaks',
    title: 'Short, infrequent breaks carry the most risk',
    findings: [
      { text: 'Injury risk was highest when rest breaks came less often than every four hours or lasted under 30 minutes (Fischer et al., 2017).', kind: 'Meta-analysis' },
    ],
  },
  {
    id: 'motivation',
    label: 'Motivation and engagement',
    title: 'How people feel about the task shapes how well they do it',
    findings: [
      { text: 'Even after allowing for time of day and hours awake, performance was better when ratings of alertness and motivation were higher (Hull et al., 2003).', kind: 'Laboratory study, 15 adults' },
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership and AI-related change',
    title: 'Research in progress',
    findings: [
      { text: 'Georgia’s current research looks at how leadership behaviours support engagement, motivation, psychological safety and confidence during AI-related change in small and medium-sized enterprises.', kind: 'In progress' },
    ],
  },
];
