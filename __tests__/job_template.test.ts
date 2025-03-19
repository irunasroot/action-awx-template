import * as core from '@actions/core'
import axios from 'axios'

import { JobTemplate } from '../src/models/index'

import { JOB_TEMPLATE_DATA } from './mock_data/job_template'
import { JOB_LAUNCH_DATA } from './mock_data/job_launch'
import { JOB_STATUS_DATA } from './mock_data/job_status'
import {
  JOB_TEMPLATE_INPUT_DATA,
  JOB_TEMPLATE_INPUT_DATA_ARRAY
} from './mock_data/job_template_input'
import { JOB_TEMPLATE_REQUIREMENTS } from './mock_data/job_requirements'
import { JOB_OUTPUT_DATA_ANSI } from './mock_data/job_output'

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

beforeAll(() => {
  jest.spyOn(JobTemplate.prototype, 'sleep').mockImplementation()
})

describe('Testing Job Template Initializations', () => {
  test('Job Template invalid ID', () => {
    expect(() => {
      new JobTemplate(
        JOB_TEMPLATE_INPUT_DATA.controller_url,
        JOB_TEMPLATE_INPUT_DATA.controller_username,
        JOB_TEMPLATE_INPUT_DATA.controller_password,
        JOB_TEMPLATE_INPUT_DATA.controller_token,
        JOB_TEMPLATE_INPUT_DATA.controller_timeout,
        JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
        null,
        JOB_TEMPLATE_INPUT_DATA.extra_vars,
        JOB_TEMPLATE_INPUT_DATA.inventory,
        JOB_TEMPLATE_INPUT_DATA.scm_branch,
        JOB_TEMPLATE_INPUT_DATA.limit,
        JOB_TEMPLATE_INPUT_DATA.job_tags,
        JOB_TEMPLATE_INPUT_DATA.skip_tags,
        JOB_TEMPLATE_INPUT_DATA.job_type,
        JOB_TEMPLATE_INPUT_DATA.verbosity,
        JOB_TEMPLATE_INPUT_DATA.diff_mode,
        JOB_TEMPLATE_INPUT_DATA.credentials,
        JOB_TEMPLATE_INPUT_DATA.credential_passwords,
        JOB_TEMPLATE_INPUT_DATA.execution_environment,
        JOB_TEMPLATE_INPUT_DATA.labels,
        JOB_TEMPLATE_INPUT_DATA.forks,
        JOB_TEMPLATE_INPUT_DATA.job_slice_count,
        JOB_TEMPLATE_INPUT_DATA.timeout,
        JOB_TEMPLATE_INPUT_DATA.instance_groups
      )
    }).toThrow(Error)
  })
})

describe('Job Template Validations', () => {
  const template = new JobTemplate(...JOB_TEMPLATE_INPUT_DATA_ARRAY)

  test('Pass all validations - no requirements', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS
    })

    const req_JOB_TEMPLATE_REQUIREMENTS =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)
    template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS)

    expect(req_JOB_TEMPLATE_REQUIREMENTS).toEqual(JOB_TEMPLATE_REQUIREMENTS)
  })

  test('Pass all validation - with requirements', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      { my_var: 'my_val' }, //extra_vars
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      'someserver.domain.local', //limit
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      true, //diff_mode
      [1, 2, 10], //credentials
      JOB_TEMPLATE_INPUT_DATA.credential_passwords,
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      0, //forks
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_credential_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_diff_mode_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_forks_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_limit_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_variables_on_launch = true

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)
    expect(
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    ).toBeUndefined()
  })

  test('Fail validation - with requirements', async () => {
    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_credential_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_diff_mode_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_forks_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_limit_on_launch = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.ask_variables_on_launch = true

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })

  test('Pass survey validation', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      JSON.parse(
        '{"my_var": "my_val","my_var2":"my_val2","my_var3":"my_val3","my_var4":"my_val4"}'
      ), //extra_vars
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      JOB_TEMPLATE_INPUT_DATA.credential_passwords,
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    ).toBeUndefined()
  })

  test('Fail survey validation - some missing variables', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      {
        my_var: 'my_val',
        my_var3: 'my_val3',
        my_var4: 'my_val4',
        my_var5: 'my_val5'
      }, //extra_vars
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      JOB_TEMPLATE_INPUT_DATA.credential_passwords,
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })

  test('Fail survey validation - extra_vars empty', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      {}, //extra_vars
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      JOB_TEMPLATE_INPUT_DATA.credential_passwords,
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })

  test('Fail survey validation - extra_vars null', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      null, //extra_vars
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      JOB_TEMPLATE_INPUT_DATA.credential_passwords,
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })

  test('Pass credentials passwords validation', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      JOB_TEMPLATE_INPUT_DATA.extra_vars,
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      { cred1: 'pass1', cred2: 'pass2', cred3: 'pass3', cred4: 'pass4' }, //credential_passwords
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.passwords_needed_to_start = ['cred1', 'cred2']

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    ).toBeUndefined()
  })

  test('Fail credentials passwords validation - some missing', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      JOB_TEMPLATE_INPUT_DATA.extra_vars,
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      { cred1: 'pass1', cred3: 'pass3', cred4: 'pass4' }, //credential_passwords
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.passwords_needed_to_start = ['cred1', 'cred2']

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })

  test('Fail credentials passwords validation - credential_passwords empty', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      JOB_TEMPLATE_INPUT_DATA.extra_vars,
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      {}, //credential_passwords
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.passwords_needed_to_start = ['cred1', 'cred2']

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })

  test('Fail credentials passwords validation - credential_passwords null', async () => {
    const template = new JobTemplate(
      JOB_TEMPLATE_INPUT_DATA.controller_url,
      JOB_TEMPLATE_INPUT_DATA.controller_username,
      JOB_TEMPLATE_INPUT_DATA.controller_password,
      JOB_TEMPLATE_INPUT_DATA.controller_token,
      JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      JOB_TEMPLATE_INPUT_DATA.template_id,
      JOB_TEMPLATE_INPUT_DATA.extra_vars,
      JOB_TEMPLATE_INPUT_DATA.inventory,
      JOB_TEMPLATE_INPUT_DATA.scm_branch,
      JOB_TEMPLATE_INPUT_DATA.limit,
      JOB_TEMPLATE_INPUT_DATA.job_tags,
      JOB_TEMPLATE_INPUT_DATA.skip_tags,
      JOB_TEMPLATE_INPUT_DATA.job_type,
      JOB_TEMPLATE_INPUT_DATA.verbosity,
      JOB_TEMPLATE_INPUT_DATA.diff_mode,
      JOB_TEMPLATE_INPUT_DATA.credentials,
      null, //credential_passwords
      JOB_TEMPLATE_INPUT_DATA.execution_environment,
      JOB_TEMPLATE_INPUT_DATA.labels,
      JOB_TEMPLATE_INPUT_DATA.forks,
      JOB_TEMPLATE_INPUT_DATA.job_slice_count,
      JOB_TEMPLATE_INPUT_DATA.timeout,
      JOB_TEMPLATE_INPUT_DATA.instance_groups
    )

    const JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(JOB_TEMPLATE_REQUIREMENTS)
    )
    JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    JOB_TEMPLATE_REQUIREMENTS_ASK.passwords_needed_to_start = ['cred1', 'cred2']

    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(() => {
      template.validateLaunchRequirements(req_JOB_TEMPLATE_REQUIREMENTS_ASK)
    }).toThrow(Error)
  })
})

describe('Job Template run function', () => {
  test('Pass run function', async () => {
    const template = new JobTemplate(...JOB_TEMPLATE_INPUT_DATA_ARRAY)
    const JOB_STATUS_DATA_RUNNING = JSON.parse(JSON.stringify(JOB_STATUS_DATA))

    JOB_STATUS_DATA_RUNNING.finished = null

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {
        'x-api-product-name': 'AAP gateway'
      }
    })
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
        // Third call to get Job Status (before loop) (not finished)
        data: JOB_STATUS_DATA_RUNNING
      })
      .mockResolvedValueOnce({
        // Fourth call to get job status (in loop) (not finished)
        data: JOB_STATUS_DATA_RUNNING
      })
      .mockResolvedValueOnce({
        // Fifth call to get job status (in loop) (not finished)
        data: JOB_STATUS_DATA_RUNNING
      })
      .mockResolvedValueOnce({
        // Sixth call to get job status (in loop) (finished)
        data: JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Seventh call to get job output
        data: JOB_OUTPUT_DATA_ANSI
      })

    expect(await template.run()).toBeUndefined()
  })

  test('Fail run function', async () => {
    const template = new JobTemplate(...JOB_TEMPLATE_INPUT_DATA_ARRAY)
    const JOB_STATUS_DATA_FAILED = JSON.parse(JSON.stringify(JOB_STATUS_DATA))

    JOB_STATUS_DATA_FAILED.failed = true
    JOB_STATUS_DATA_FAILED.status = 'failed'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })
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
        // Third call to get Job Status (before loop) (not finished)
        data: JOB_STATUS_DATA_FAILED
      })
      .mockResolvedValueOnce({
        // Fourth call to get job output
        data: JOB_OUTPUT_DATA_ANSI
      })

    await template.run()

    expect(core.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Base API Endpoint should be /api/v2', async () => {
    const template = new JobTemplate(...JOB_TEMPLATE_INPUT_DATA_ARRAY)

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {
        'x-api-product-name': 'AWX'
      }
    })

    template.baseApi = await template.getBaseApi()

    expect(template.baseApi).toEqual('/api/v2')
  })

  test('Base API Endpoint should be /api/controller/v2', async () => {
    const template = new JobTemplate(...JOB_TEMPLATE_INPUT_DATA_ARRAY)

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {
        'x-api-product-name': 'AAP gateway'
      }
    })

    template.baseApi = await template.getBaseApi()

    expect(template.baseApi).toEqual('/api/controller/v2')
  })
})
