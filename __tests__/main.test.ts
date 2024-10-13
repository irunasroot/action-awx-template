import * as core from '@actions/core'
import axios from 'axios'

import { run } from '../src/main'
import { getInput } from './mock_functions/getInput'
import { JobTemplate, WorkflowJobTemplate } from '../src/models'
import {
  JOB_TEMPLATE_INPUT_DATA,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA
} from './mock_data/job_template_input'
import {
  JOB_TEMPLATE_DATA,
  WORKFLOW_JOB_TEMPLATE_DATA
} from './mock_data/job_template'
import {
  JOB_TEMPLATE_REQUIREMENTS,
  WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
} from './mock_data/job_requirements'
import { JOB_OUTPUT_DATA_ANSI } from './mock_data/job_output'
import {
  JOB_LAUNCH_DATA,
  WORKFLOW_JOB_LAUNCH_DATA
} from './mock_data/job_launch'
import { JOB_STATUS_DATA } from './mock_data/job_status'
import { WORKFLOW_JOB_NODES } from './mock_data/workflow_nodes'
import {
  NODE_ONE_JOB_STATUS_DATA,
  NODE_TWO_JOB_STATUS_DATA,
  NODE_THREE_JOB_STATUS_DATA
} from './mock_data/job_status_nodes'

jest.mock('axios')
jest.mock('@actions/core')

const mockAxios = axios as jest.Mocked<typeof axios>
const mockCore = core as jest.Mocked<typeof core>

mockAxios.create.mockImplementation(() => axios)
mockCore.debug.mockImplementation()
mockCore.info.mockImplementation()
mockCore.startGroup.mockImplementation()
mockCore.endGroup.mockImplementation()
mockCore.setFailed.mockImplementation()
mockCore.setSecret.mockImplementation()
mockCore.getInput.mockImplementation(getInput)

const OLDENV = process.env

beforeEach(() => {
  jest.resetModules()
  jest.spyOn(JobTemplate.prototype, 'sleep').mockImplementation()
  jest.spyOn(WorkflowJobTemplate.prototype, 'sleep').mockImplementation()
  process.env = { ...OLDENV }
})

afterAll(() => {
  process.env = OLDENV
})

describe('Test main run function', () => {
  test('Testing run with Job Template', async () => {
    process.env.INPUT_CONTROLLER_URL = JOB_TEMPLATE_INPUT_DATA.controller_url
    process.env.INPUT_CONTROLLER_USERNAME =
      JOB_TEMPLATE_INPUT_DATA.controller_username
    process.env.INPUT_CONTROLLER_PASSWORD =
      JOB_TEMPLATE_INPUT_DATA.controller_password
    process.env.INPUT_CONTROLLER_TOKEN =
      JOB_TEMPLATE_INPUT_DATA.controller_token
    process.env.INPUT_CONTROLLER_TIMEOUT = String(
      JOB_TEMPLATE_INPUT_DATA.controller_timeout
    )
    process.env.INPUT_CONTROLLER_VERIFY_CERTIFICATE = String(
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate
    )
    process.env.INPUT_JOB_TEMPLATE_ID = String(JOB_TEMPLATE_DATA.id)
    process.env.INPUT_EXTRA_VARS = String(JOB_TEMPLATE_INPUT_DATA.extra_vars)
    process.env.INPUT_INVENTORY = String(JOB_TEMPLATE_INPUT_DATA.inventory)
    process.env.INPUT_SCM_BRANCH = String(JOB_TEMPLATE_INPUT_DATA.scm_branch)
    process.env.INPUT_LIMIT = String(JOB_TEMPLATE_INPUT_DATA.limit)
    process.env.INPUT_JOB_TAGS = String(JOB_TEMPLATE_INPUT_DATA.job_tags)
    process.env.INPUT_SKIP_TAGS = String(JOB_TEMPLATE_INPUT_DATA.skip_tags)
    process.env.INPUT_JOB_TYPE = 'run'
    process.env.INPUT_VERBOSITY = String(JOB_TEMPLATE_INPUT_DATA.verbosity)
    process.env.INPUT_DIFF_MODE = String(JOB_TEMPLATE_INPUT_DATA.diff_mode)
    process.env.INPUT_CREDENTIALS = String(JOB_TEMPLATE_INPUT_DATA.credentials)
    process.env.INPUT_CREDENTIAL_PASSWORDS = String(
      JOB_TEMPLATE_INPUT_DATA.credential_passwords
    )
    process.env.INPUT_EXECUTION_ENVIRONMENT = String(
      JOB_TEMPLATE_INPUT_DATA.execution_environment
    )
    process.env.INPUT_LABELS = String(JOB_TEMPLATE_INPUT_DATA.labels)
    process.env.INPUT_FORKS = String(JOB_TEMPLATE_INPUT_DATA.forks)
    process.env.INPUT_JOB_SLICE_COUNT = String(
      JOB_TEMPLATE_INPUT_DATA.job_slice_count
    )
    process.env.INPUT_TIMEOUT = String(JOB_TEMPLATE_INPUT_DATA.timeout)
    process.env.INPUT_INSTANCE_GROUPS = String(
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    mockAxios.get.mockResolvedValueOnce({
      // First call to get job requirements
      data: JOB_TEMPLATE_REQUIREMENTS
    })
    mockAxios.post.mockResolvedValueOnce({
      // Second call to launch the job template
      data: JOB_LAUNCH_DATA
    })
    mockAxios.get
      .mockResolvedValueOnce({
        // Sixth call to get job status (in loop) (finished)
        data: JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Seventh call to get job output
        data: JOB_OUTPUT_DATA_ANSI
      })

    expect(await run()).toBeUndefined()
  })

  test('Testing run with Workflow Job Template', async () => {
    process.env.INPUT_CONTROLLER_URL =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url
    process.env.INPUT_CONTROLLER_USERNAME =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username
    process.env.INPUT_CONTROLLER_PASSWORD =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password
    process.env.INPUT_CONTROLLER_TOKEN =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token
    process.env.INPUT_CONTROLLER_TIMEOUT = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout
    )
    process.env.INPUT_CONTROLLER_VERIFY_CERTIFICATE = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate
    )
    process.env.INPUT_WORKFLOW_JOB_TEMPLATE_ID = String(
      WORKFLOW_JOB_TEMPLATE_DATA.id
    )
    process.env.INPUT_EXTRA_VARS = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.extra_vars
    )
    process.env.INPUT_INVENTORY = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory
    )
    process.env.INPUT_SCM_BRANCH = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch
    )
    process.env.INPUT_LIMIT = String(WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit)
    process.env.INPUT_JOB_TAGS = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags
    )
    process.env.INPUT_SKIP_TAGS = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
    )

    mockAxios.get.mockResolvedValueOnce({
      // First call to get job requirements
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
    })
    mockAxios.post.mockResolvedValueOnce({
      // Second call to launch the job template
      data: WORKFLOW_JOB_LAUNCH_DATA
    })
    mockAxios.get
      .mockResolvedValueOnce({
        // Third call to get workflow nodes
        data: WORKFLOW_JOB_NODES
      })
      .mockResolvedValueOnce({
        // Fourth call to get job status of node one
        data: NODE_ONE_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Fifth call to get job status of node one
        data: NODE_TWO_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Sixth call to get job status of node one
        data: NODE_THREE_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Seventh call to get job output (first workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })
      .mockResolvedValueOnce({
        // Eighth call to get job output (second workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })
      .mockResolvedValueOnce({
        // Ninth call to get job output (third workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })

    expect(await run()).toBeUndefined()
  })

  test('Testing run with missing template IDs', async () => {
    process.env.INPUT_CONTROLLER_URL =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url
    process.env.INPUT_CONTROLLER_USERNAME =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username
    process.env.INPUT_CONTROLLER_PASSWORD =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password
    process.env.INPUT_CONTROLLER_TOKEN =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token
    process.env.INPUT_CONTROLLER_TIMEOUT = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout
    )
    process.env.INPUT_CONTROLLER_VERIFY_CERTIFICATE = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate
    )
    process.env.INPUT_WORKFLOW_JOB_TEMPLATE_ID = String(
      WORKFLOW_JOB_TEMPLATE_DATA.id
    )
    process.env.INPUT_JOB_TEMPLATE_ID = String(JOB_TEMPLATE_DATA.id)

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Testing run with wrong job_type', async () => {
    process.env.INPUT_CONTROLLER_URL =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url
    process.env.INPUT_CONTROLLER_USERNAME =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username
    process.env.INPUT_CONTROLLER_PASSWORD =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password
    process.env.INPUT_CONTROLLER_TOKEN =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token
    process.env.INPUT_CONTROLLER_TIMEOUT = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout
    )
    process.env.INPUT_CONTROLLER_VERIFY_CERTIFICATE = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate
    )
    process.env.INPUT_WORKFLOW_JOB_TEMPLATE_ID = String(
      WORKFLOW_JOB_TEMPLATE_DATA.id
    )
    process.env.INPUT_JOB_TEMPLATE_ID = String(JOB_TEMPLATE_DATA.id)
    process.env.INPUT_JOB_TYPE = 'irunasroot'

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Testing run with wrong verbosity level', async () => {
    process.env.INPUT_CONTROLLER_URL =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url
    process.env.INPUT_CONTROLLER_USERNAME =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username
    process.env.INPUT_CONTROLLER_PASSWORD =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password
    process.env.INPUT_CONTROLLER_TOKEN =
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token
    process.env.INPUT_CONTROLLER_TIMEOUT = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout
    )
    process.env.INPUT_CONTROLLER_VERIFY_CERTIFICATE = String(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate
    )
    process.env.INPUT_WORKFLOW_JOB_TEMPLATE_ID = String(
      WORKFLOW_JOB_TEMPLATE_DATA.id
    )
    process.env.INPUT_JOB_TEMPLATE_ID = String(JOB_TEMPLATE_DATA.id)
    process.env.INPUT_VERBOSITY = '10'

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })
})
