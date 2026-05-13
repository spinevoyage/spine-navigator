import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Activity,
  CheckCircle2,
  ClipboardList,
  RotateCcw,
  Stethoscope,
  ShieldAlert,
  ArrowRight,
  Download,
  Brain,
  FileText,
  Dumbbell,
  HeartPulse,
  Database,
  LockKeyhole,
  UserRound,
} from "lucide-react";

const initialState = {
  consent: false,

  demographics: {
    ageGroup: "",
    sex: "",
    occupationType: "",
    workDemand: "",
  },

  region: "",
  duration: "",

  vasNeck: 0,
  vasBack: 0,
  vasArm: 0,
  vasLeg: 0,

  redFlags: {
    bladderBowel: false,
    saddle: false,
    progressiveWeakness: false,
    trauma: false,
    osteoporosisRisk: false,
    feverWeightCancer: false,
    nightRestPain: false,
  },

  symptoms: {
    neckPain: false,
    backPain: false,
    armPain: false,
    legPain: false,
    numbnessTingling: false,
    painBelowKnee: false,
    coughSneezeLegPain: false,
    handClumsy: false,
    gaitImbalance: false,
    electricShock: false,
    walkingWorse: false,
    sittingRelief: false,
    forwardBendRelief: false,
    buttockPain: false,
    posteriorThighPain: false,
    painOnTurningBed: false,
    painOnExtensionRotation: false,
armNumbness: false,
    handWeakness: false,
    legWeakness: false,
    walkingImbalance: false,
    nightPain: false,
    postureDeformity: false,
    adolescentGrowth: false,
  },
  selfTests: {
    legRaiseTest: false,
    shoppingCartRelief: false,
    heelWalkDifficulty: false,
    toeWalkDifficulty: false,
    tandemGaitDifficulty: false,
    lhermitte: false,
    shoulderAbductionRelief: false,
    modifiedSpurling: false,
  },
};

export default function App() {
  const [data, setData] = useState(initialState);
const diagnosis = useMemo(() => {

  if (
    data.redFlags.bladderBowel ||
    data.redFlags.saddle ||
    data.redFlags.progressiveWeakness
  ) {
    return {
      primary:
        "Possible serious neurological warning signs",

      secondary:
        "Urgent spinal evaluation recommended",

      recommendation:
        "Please seek urgent medical attention.",
    };
  }

 let discScore = 0;
let stenosisScore = 0;
let mechanicalNeckScore = 0;
let cervicalRadiculopathyScore = 0;
let myelopathyScore = 0;

  if (data.symptoms.legPain) discScore += 2;
  if (data.symptoms.painBelowKnee) discScore += 3;
  if (data.symptoms.backPain) discScore += 1;
  if (data.symptoms.numbnessTingling) discScore += 1;
  if (data.symptoms.coughSneezeLegPain) discScore += 2;
if (data.selfTests.legRaiseTest)
  discScore += 3;

if (data.selfTests.heelWalkDifficulty)
  discScore += 2;

if (data.selfTests.toeWalkDifficulty)
  discScore += 2;
  if (data.symptoms.walkingWorse) stenosisScore += 3;
  if (data.symptoms.forwardBendRelief) stenosisScore += 3;
  if (data.symptoms.legPain) stenosisScore += 1;
  if (data.symptoms.backPain) stenosisScore += 1;
  if (data.symptoms.numbnessTingling) stenosisScore += 1;
if (data.selfTests.shoppingCartRelief)
  stenosisScore += 3;

 if (
  data.symptoms.neckPain &&
  !data.symptoms.armPain &&
  !data.symptoms.armNumbness &&
  !data.symptoms.handClumsy &&
  !data.symptoms.gaitImbalance
) {
  mechanicalNeckScore += 4;
}

if (data.symptoms.armPain) cervicalRadiculopathyScore += 4;
if (data.symptoms.armNumbness) cervicalRadiculopathyScore += 3;
if (data.selfTests.modifiedSpurling)
  cervicalRadiculopathyScore += 2;

if (data.selfTests.shoulderAbductionRelief)
  cervicalRadiculopathyScore += 2;
if (
  data.symptoms.neckPain &&
  (data.symptoms.armPain || data.symptoms.armNumbness)
) {
  cervicalRadiculopathyScore += 1;
}

 if (data.symptoms.handClumsy) myelopathyScore += 4;

if (data.symptoms.gaitImbalance)
  myelopathyScore += 4;

if (data.symptoms.electricShock)
  myelopathyScore += 2;

if (data.symptoms.walkingImbalance)
  myelopathyScore += 2;

if (
  data.symptoms.handClumsy &&
  data.symptoms.gaitImbalance
) {
  myelopathyScore += 3;
}
if (data.selfTests.tandemGaitDifficulty)
  myelopathyScore += 3;

if (data.selfTests.lhermitte)
  myelopathyScore += 2;

  const scores = [
   {
  label:
    "Possible mechanical / non-specific neck pain",

  score: mechanicalNeckScore,

  secondary:
    "Maintain posture care and observe for neurological symptoms",
},
{
      label:
        "Possible lumbar disc prolapse / sciatica",
      score: discScore,
      secondary:
        "Lumbar spinal stenosis remains possible",
    },

    {
      label:
        "Possible lumbar spinal stenosis",
      score: stenosisScore,
      secondary:
        "Disc prolapse / sciatica remains possible",
    },

    {
      label:
        "Possible cervical radiculopathy",
      score: cervicalRadiculopathyScore,
      secondary:
        "Further neurological assessment may help",
    },

    {
      label:
        "Possible cervical spinal cord involvement",
      score: myelopathyScore,
      secondary:
        "Cervical myelopathy should be excluded clinically",
    },
  ];

  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score <= 1) {
    return {
      primary:
        "Non-specific spine pain pattern",

      secondary:
        "No dominant syndrome identified",

      recommendation:
        "Observation, posture care, and conservative management may be reasonable.",
    };
  }

  return {
    primary: scores[0].label,
    secondary: scores[0].secondary,
    recommendation:
      "Clinical correlation and professional assessment are advised.",
  };

}, [data]);
  function set(path, value) {
    setData((prev) => {
      const copy = structuredClone(prev);

      const parts = path.split(".");
      let node = copy;

      for (let i = 0; i < parts.length - 1; i++) {
        node = node[parts[i]];
      }

      node[parts[parts.length - 1]] = value;

      return copy;
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-900 px-6 py-5">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <Stethoscope size={16} />
            Educational spine triage platform
          </p>

          <h1 className="text-4xl font-bold">
            Spine Self Check
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Understand your symptoms, identify warning signs,
            and know when to seek medical attention.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-2">

        <section className="rounded-3xl bg-white p-6 text-slate-950">

          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <LockKeyhole />
            Consent
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">

            <p>
              This tool is educational and does not replace
              consultation, examination, or emergency care.
            </p>

            <p className="mt-3">
              Anonymous symptom and score data may be stored
              for research and quality improvement.
            </p>

          </div>

          <button
            onClick={() => set("consent", !data.consent)}
            className={`mt-5 w-full rounded-2xl p-4 font-semibold transition ${
              data.consent
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {data.consent
              ? "✓ Consent provided"
              : "I agree and wish to continue"}
          </button>

        </section>

        <section className="rounded-3xl bg-white p-6 text-slate-950">

          <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
            <ClipboardList />
            Basic Information
          </h2>

          <div className="space-y-4">

            <Select
              label="Age Group"
              value={data.demographics.ageGroup}
              onChange={(v) => set("demographics.ageGroup", v)}
              options={[
                "Under 18",
                "18–40",
                "41–60",
                "Above 60",
              ]}
            />

            <Select
              label="Sex"
              value={data.demographics.sex}
              onChange={(v) => set("demographics.sex", v)}
              options={[
                "Female",
                "Male",
                "Other / Prefer not to say",
              ]}
            />

            <Select
              label="Region of Concern"
              value={data.region}
              onChange={(v) => set("region", v)}
              options={[
                "Neck",
                "Neck with arm pain",
                "Lower back",
                "Back with leg pain",
                "Spine deformity concern",
              ]}
            />

          </div>

        </section>
<section className="rounded-3xl bg-white p-6 text-slate-950">

  <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
    <ShieldAlert />
    Red Flag Screening
  </h2>	

  <div className="space-y-3">

    <Toggle
      label="Bladder or bowel disturbance"
      value={data.redFlags.bladderBowel}
      onChange={() =>
        set(
          "redFlags.bladderBowel",
          !data.redFlags.bladderBowel
        )
      }
    />

    <Toggle
      label="Saddle/private area numbness"
      value={data.redFlags.saddle}
      onChange={() =>
        set(
          "redFlags.saddle",
          !data.redFlags.saddle
        )
      }
    />

    <Toggle
      label="Progressive weakness"
      value={data.redFlags.progressiveWeakness}
      onChange={() =>
        set(
          "redFlags.progressiveWeakness",
          !data.redFlags.progressiveWeakness
        )
      }
    />

    <Toggle
      label="Fever, weight loss, cancer, or infection history"
      value={data.redFlags.feverWeightCancer}
      onChange={() =>
        set(
          "redFlags.feverWeightCancer",
          !data.redFlags.feverWeightCancer
        )
      }
    />

    <Toggle
      label="Trauma or fall before symptoms"
      value={data.redFlags.trauma}
      onChange={() =>
        set(
          "redFlags.trauma",
          !data.redFlags.trauma
        )
      }
    />

  </div>

</section>
<section className="rounded-3xl bg-white p-6 text-slate-950">

  <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
    <Activity />
    Symptoms
  </h2>

  <div className="space-y-3">

    <Toggle
      label="Neck pain"
      value={data.symptoms.neckPain}
      onChange={() =>
        set(
          "symptoms.neckPain",
          !data.symptoms.neckPain
        )
      }
    />

    <Toggle
      label="Back pain"
      value={data.symptoms.backPain}
      onChange={() =>
        set(
          "symptoms.backPain",
          !data.symptoms.backPain
        )
      }
    />

    <Toggle
      label="Pain radiating into arm"
      value={data.symptoms.armPain}
      onChange={() =>
        set(
          "symptoms.armPain",
          !data.symptoms.armPain
        )
      }
    />

    <Toggle
      label="Pain radiating into leg"
      value={data.symptoms.legPain}
      onChange={() =>
        set(
          "symptoms.legPain",
          !data.symptoms.legPain
        )
      }
    />

    <Toggle
      label="Numbness or tingling"
      value={data.symptoms.numbnessTingling}
      onChange={() =>
        set(
          "symptoms.numbnessTingling",
          !data.symptoms.numbnessTingling
        )
      }
    />

    <Toggle
      label="Pain travels below knee"
      value={data.symptoms.painBelowKnee}
      onChange={() =>
        set(
          "symptoms.painBelowKnee",
          !data.symptoms.painBelowKnee
        )
      }
    />

    <Toggle
      label="Walking worsens symptoms"
      value={data.symptoms.walkingWorse}
      onChange={() =>
        set(
          "symptoms.walkingWorse",
          !data.symptoms.walkingWorse
        )
      }
    />

    <Toggle
      label="Forward bending relieves symptoms"
      value={data.symptoms.forwardBendRelief}
      onChange={() =>
        set(
          "symptoms.forwardBendRelief",
          !data.symptoms.forwardBendRelief
        )
      }
    />
<Toggle
  label="Hand clumsiness or difficulty buttoning/writing"
  value={data.symptoms.handClumsy}
  onChange={() =>
    set(
      "symptoms.handClumsy",
      !data.symptoms.handClumsy
    )
  }
/>

<Toggle
  label="Imbalance while walking"
  value={data.symptoms.gaitImbalance}
  onChange={() =>
    set(
      "symptoms.gaitImbalance",
      !data.symptoms.gaitImbalance
    )
  }
/>

<Toggle
  label="Electric-shock sensation down spine or limbs"
  value={data.symptoms.electricShock}
  onChange={() =>
    set(
      "symptoms.electricShock",
      !data.symptoms.electricShock
    )
  }
/>

<Toggle
  label="Walking feels unsteady or poorly coordinated"
  value={data.symptoms.walkingImbalance}
  onChange={() =>
    set(
      "symptoms.walkingImbalance",
      !data.symptoms.walkingImbalance
    )
  }
/>

  </div>

</section>
<section className="rounded-3xl bg-white p-6 text-slate-950">

  <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
    <Dumbbell />
    Guided Self-Tests
  </h2>

  <p className="mb-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
    These self-tests are simplified educational adaptations. Accuracy may be limited when done without supervision. Some clinical tests are ideally performed passively by a trained examiner. Stop if any test worsens pain, causes dizziness, or feels unsafe.
  </p>

  <div className="space-y-4">

    <SelfTestCard
      title="Leg Raise Test"
      instruction="Lie flat and gently raise the painful leg while keeping the knee straight."
      note="A formal straight-leg-raise test is usually performed passively by an examiner."
      question="Does this reproduce shooting pain below the knee?"
      value={data.selfTests.legRaiseTest}
      onChange={() =>
        set(
          "selfTests.legRaiseTest",
          !data.selfTests.legRaiseTest
        )
      }
    />

    <SelfTestCard
      title="Shopping Cart Relief Test"
      instruction="Think about walking while slightly leaning forward, like resting on a shopping cart."
      note="This is a symptom pattern question, not a formal physical examination test."
      question="Do your leg symptoms improve when you bend forward?"
      value={data.selfTests.shoppingCartRelief}
      onChange={() =>
        set(
          "selfTests.shoppingCartRelief",
          !data.selfTests.shoppingCartRelief
        )
      }
    />

    <SelfTestCard
      title="Heel Walk Test"
      instruction="Try walking a few steps on your heels while holding support nearby."
      note="Do not attempt this if you feel unsafe or at risk of falling."
      question="Is heel walking weak or difficult on one side?"
      value={data.selfTests.heelWalkDifficulty}
      onChange={() =>
        set(
          "selfTests.heelWalkDifficulty",
          !data.selfTests.heelWalkDifficulty
        )
      }
    />

    <SelfTestCard
      title="Toe Walk Test"
      instruction="Try standing or walking briefly on your toes while holding support nearby."
      note="Do not attempt this if you feel unsafe or at risk of falling."
      question="Is toe walking weak or difficult on one side?"
      value={data.selfTests.toeWalkDifficulty}
      onChange={() =>
        set(
          "selfTests.toeWalkDifficulty",
          !data.selfTests.toeWalkDifficulty
        )
      }
    />

    <SelfTestCard
      title="Balance Walk Test"
      instruction="Try walking heel-to-toe in a straight line, with support nearby."
      note="This is only a rough balance screen and does not replace neurological examination."
      question="Do you feel unusually unsteady or unable to balance?"
      value={data.selfTests.tandemGaitDifficulty}
      onChange={() =>
        set(
          "selfTests.tandemGaitDifficulty",
          !data.selfTests.tandemGaitDifficulty
        )
      }
    />

    <SelfTestCard
      title="Neck Flexion Shock Test"
      instruction="Slowly bend your neck forward."
      note="Stop immediately if this causes severe symptoms."
      question="Do you feel an electric-shock sensation down the spine, arms, or legs?"
      value={data.selfTests.lhermitte}
      onChange={() =>
        set(
          "selfTests.lhermitte",
          !data.selfTests.lhermitte
        )
      }
    />

    <SelfTestCard
      title="Arm Relief Position"
      instruction="Place the painful-side hand gently over your head."
      note="This may sometimes reduce nerve-root related arm symptoms."
      question="Does this reduce arm pain or tingling?"
      value={data.selfTests.shoulderAbductionRelief}
      onChange={() =>
        set(
          "selfTests.shoulderAbductionRelief",
          !data.selfTests.shoulderAbductionRelief
        )
      }
    />

    <SelfTestCard
      title="Gentle Neck Turn Test"
      instruction="Gently turn your head toward the painful side and slightly tilt backward."
      note="Do not push, compress, or force the neck. Stop if symptoms worsen."
      question="Does this reproduce arm pain or tingling?"
      value={data.selfTests.modifiedSpurling}
      onChange={() =>
        set(
          "selfTests.modifiedSpurling",
          !data.selfTests.modifiedSpurling
        )
      }
    />

  </div>

</section>
<section className="rounded-3xl bg-white p-6 text-slate-950">

  <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold">
    <Brain />
    Preliminary Assessment
  </h2>

  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
      Symptom Pattern
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {diagnosis.primary}
    </h3>

    <p className="mt-4 text-slate-600">
      {diagnosis.recommendation}
    </p>
<p className="mt-3 text-sm text-slate-500">
  {diagnosis.secondary}
</p>

  </div>

</section>
      </main>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block font-semibold">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-300 p-4"
      >
        <option value="">Select</option>

        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        value
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white"
      }`}
    >
      {value ? "✓ " : ""}
      {label}
    </button>
  );
} 
function SelfTestCard({
  title,
  instruction,
  note,
  question,
  value,
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">

      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-3 text-sm text-slate-700">
        {instruction}
      </p>

      <p className="mt-3 rounded-xl bg-slate-100 p-3 text-xs leading-5 text-slate-600">
        {note}
      </p>

      <button
        onClick={onChange}
        className={`mt-4 w-full rounded-2xl p-4 text-left transition ${
          value
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-slate-800"
        }`}
      >
        {value ? "✓ " : ""}
        {question}
      </button>

    </div>
  );
}