import React, { PureComponent } from 'react';

import { INTRO_STEPS, COLORS } from '../../constants';

import Header from '../Header';
import Paragraph from '../Paragraph';
import SectionTitle from '../SectionTitle';
import Sidebar from '../Sidebar';
import Aux from '../Aux';

import type { IntroStep } from '../../constants';
import type { WaveformShape } from '../../types';

export type StepData = {
  id: string,

  // Waveform/AirGrid parameters
  showWaveform: boolean,
  showAirGrid: boolean,
  frequencyOverride: ?number,
  amplitudeOverride: ?number,
  isPlaying: boolean,
  waveformShape: WaveformShape,
  waveformColor: string,
  waveformOpacity: number,
  // TODO: should just use `xAxisOpacity`. When opacity is 0, we can choose
  // not to render within the component (or just keep it hidden)
  showXAxis: boolean,
  showYAxis: boolean,
  showXAxisLabels: boolean,
  showYAxisLabels: boolean,
  showYAxisIntercept: boolean,
  xAxisOpacity: number,
  yAxisOpacity: number,
  showAmplitudeSlider: boolean,
  showFrequencySlider: boolean,
  frequencySliderMin: number,
  frequencySliderMax: number,
  frequencySliderStep: number,
  showCycleIndicator: boolean,

  // Section parameters
  getMargin: (windowWidth: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

const defaults: StepData = {
  showWaveform: true,
  showAirGrid: false,
  frequencyOverride: null,
  amplitudeOverride: null,
  isPlaying: false,
  waveformShape: 'sine',
  waveformColor: COLORS.blue[500],
  waveformOpacity: 1,
  showXAxis: true,
  showYAxis: true,
  showXAxisLabels: false,
  showYAxisLabels: false,
  showYAxisIntercept: false,
  xAxisOpacity: 1,
  yAxisOpacity: 1,
  showAmplitudeSlider: false,
  showFrequencySlider: false,
  frequencySliderMin: 0.2,
  frequencySliderMax: 3,
  frequencySliderStep: 0.1,
  showCycleIndicator: false,
};

export const steps = {
  title: {
    ...defaults,
    showYAxis: false,
    getMargin: marginFunctions.none,
    children: <Header />,
  },
  'about-this-thing': {
    ...defaults,
    isPlaying: true,
    showYAxis: false,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>Hi there!</Paragraph>
        <Paragraph>
          This interactive guide introduces waveforms. We'll go over the
          fundamental physics of sound, learn how it relates to music and
          harmony, and discover how to build complex tones from simple ones.
        </Paragraph>
        <Paragraph>
          This guide is primarily geared towards folks who produce music, but no
          prior knowledge is required. Even if you don't have any interest in
          music production, this guide may still interest you!
        </Paragraph>
      </Aux>
    ),
  },
  'intro-with-labels': {
    ...defaults,
    children: (
      <Aux>
        <SectionTitle>1. Reading Waveforms</SectionTitle>
        <Paragraph>
          The waveform over there is a graph, a cartesian plane. It's showing
          the relationship between two dimensions.
        </Paragraph>
      </Aux>
    ),
  },
  'x-axis-time': {
    ...defaults,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          The horizontal line, our X axis, represents time. The exact units
          don't really matter right now, but to make it concrete, let's say that
          the current graph represents 1 second.
        </Paragraph>
      </Aux>
    ),
  },
  'y-axis-amplitude': {
    ...defaults,
    waveformOpacity: 0.5,
    showYAxisLabels: true,
    getMargin: marginFunctions.small,
    children: (
      <Aux>
        <Paragraph>
          The vertical line, our Y axis, represents <strong>amplitude</strong>.
          We'll go into more detail in a bit about what amplitude really is, but
          for now, you can think of it as volume. The bigger the wave, the
          louder the sound.
        </Paragraph>
      </Aux>
    ),
  },
  'y-axis-amplitude-with-control': {
    ...defaults,
    getMargin: marginFunctions.small,
    showYAxisLabels: true,
    showAmplitudeSlider: true,
    children: (
      <Aux>
        <Paragraph>
          Go ahead and tweak the waveform's amplitude, using the slider on the
          left.
        </Paragraph>

        <Paragraph>
          Try setting it all the way to 0, and notice how the line disappears.
        </Paragraph>
      </Aux>
    ),
  },
  'frequency-introduction': {
    ...defaults,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    showCycleIndicator: true,
    frequencyOverride: 2,
    children: (
      <Aux>
        <Paragraph>
          Next, let's look at <strong>frequency</strong>.
        </Paragraph>

        <Paragraph>
          The wave has been updated to repeat twice. Instead of 1 sine waveform
          cycle, you now have 2 sine waveform cycles!
        </Paragraph>

        <Paragraph>
          Important to note, though: The amount of time hasn't changed, though.
          This is still 1 second of audio.
        </Paragraph>

        <Paragraph>
          The number of cycles per second is known as the frequency. The unit of
          measurement is called the Hertz (abbreviated as 'Hz'). The wave over
          there is 2Hz, since the waveform repeats twice.
        </Paragraph>
      </Aux>
    ),
  },
  'frequency-introduction-pt2': {
    ...defaults,
    getMargin: marginFunctions.small,
    waveformOpacity: 0.5,
    showXAxisLabels: true,
    frequencyOverride: 2,
    children: (
      <Aux>
        <Paragraph>
          Frequency is just the technical term for "pitch". When you sing an
          "A4" note (The A in the middle of a standard piano), your throat
          vibrates at 440Hz.
        </Paragraph>
        <Sidebar>
          <Paragraph>
            For sound to be audible, it needs to be much faster than this: the
            human hearing range is from 20Hz to 20,000Hz.
          </Paragraph>
          <Paragraph>
            The frequencies in this guide use slower frequencies to keep the
            numbers and visualizations simpler, since the concepts are more
            important than the specific frequencies.
          </Paragraph>
        </Sidebar>
      </Aux>
    ),
  },
  'frequency-with-control': {
    ...defaults,
    getMargin: marginFunctions.small,
    showAmplitudeSlider: true,
    showFrequencySlider: true,
    children: (
      <Aux>
        <Paragraph>
          As with amplitude, feel free to tweak the frequency to see how the
          wave changes!
        </Paragraph>
      </Aux>
    ),
  },
  'how-sound-works-intro': {
    ...defaults,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
    children: (
      <Aux>
        <SectionTitle>1. How Sound Works</SectionTitle>
        <Paragraph>
          So, we've learned that waveforms are a graph showing amplitude changes
          over time, where amplitude swings between negative and positive
          values. But what the heck does that mean, in real-world terms?
        </Paragraph>

        <Paragraph>
          To help us understand, the waveform on the left now has a blue circle
          that follows the changes in amplitude over time. Because we're using a
          sine waveform, the motion is smooth.
        </Paragraph>

        <Paragraph>That blue dot</Paragraph>
      </Aux>
    ),
  },
  'how-sound-works-air-grid': {
    ...defaults,
    showWaveform: false,
    showAirGrid: true,
    isPlaying: true,
    waveformColor: COLORS.gray[700],
    waveformOpacity: 0.5,
    xAxisOpacity: 0.5,
    yAxisOpacity: 0.5,
    showYAxisIntercept: true,
    showAmplitudeSlider: true,
    showFrequencySlider: true,

    children: (
      <Aux>
        <Paragraph>
          Sound is vibration. That blue dot's motion? That's what molecules in
          the air do, when a sine wave is played.
        </Paragraph>

        <Paragraph>
          The grid on the left below the waveform represents a bunch of air
          molecules floating in the air. Notice how the molecules themselves
          aren't travelling through the air; the wave travels by causing a
          rippling effect through the air molecules.
        </Paragraph>

        <Paragraph>
          This is similar to what happens when you throw a stone in a smooth
          pond. Waves radiate outwards, but the actual water molecules don't
          move from the center out; the wave ripples through the water.
        </Paragraph>

        <Paragraph>
          Ever notice how, when you blast a song from a speaker, you can see the
          speaker cone vibrating? Speakers work by kicking off this chain
          reaction of vibrations.
        </Paragraph>

        <Sidebar>
          <Paragraph>
            Curious about how our ears translate these waves into sound that the
            brain understands? It's outside the scope of this guide, but it's
            super interesting stuff!
          </Paragraph>
          <Paragraph>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nidcd.nih.gov/health/how-do-we-hear"
            >
              Learn more about our ears and sound.
            </a>
          </Paragraph>
        </Sidebar>
      </Aux>
    ),
  },
};

export const stepsArray = Object.entries(steps).map(([key, value]) => ({
  id: key,
  ...value,
}));