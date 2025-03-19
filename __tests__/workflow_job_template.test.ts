import * as core from '@actions/core'
import axios from 'axios'

import { WorkflowJobTemplate } from '../src/models'

import { WORKFLOW_JOB_TEMPLATE_DATA } from './mock_data/job_template'
import { WORKFLOW_JOB_LAUNCH_DATA } from './mock_data/job_launch'
import { WORKFLOW_JOB_STATUS_DATA } from './mock_data/job_status'
import {
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
} from './mock_data/job_template_input'
import { WORKFLOW_JOB_TEMPLATE_REQUIREMENTS } from './mock_data/job_requirements'
import { JOB_OUTPUT_DATA_ANSI } from './mock_data/job_output'
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

beforeAll(() => {
  jest.spyOn(WorkflowJobTemplate.prototype, 'sleep').mockImplementation()
})

describe('Testing Workflow Job Template Initializations', () => {
  test('Workflow Job Template invalid ID', () => {
    expect(() => {
      new WorkflowJobTemplate(
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
        null,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.extra_vars,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
        WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
      )
    }).toThrow(Error)
  })
})

describe('Workflow Job Template Validations', () => {
  const template = new WorkflowJobTemplate(
    ...WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
  )

  test('Pass all validations - no requirements', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )
    template.validateLaunchRequirements(req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)

    expect(req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS).toEqual(
      WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
    )
  })

  test('Pass all validation - with requirements', async () => {
    const template = new WorkflowJobTemplate(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.template_id,
      { my_var: 'my_val' }, //extra_vars
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
      'someserver.domain.local', //limit
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
    )

    const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)
    )

    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.ask_variables_on_launch = true
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.ask_limit_on_launch = true

    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )
    expect(
      template.validateLaunchRequirements(
        req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
      )
    ).toBeUndefined()
  })

  test('Fail all validation - with requirements', async () => {
    const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)
    )

    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.ask_variables_on_launch = true
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.ask_limit_on_launch = true

    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )

    expect(() => {
      template.validateLaunchRequirements(
        req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
      )
    }).toThrow(Error)
  })

  test('Pass survey validation', async () => {
    const template = new WorkflowJobTemplate(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.template_id,
      JSON.parse(
        '{"my_var": "my_val","my_var2":"my_val2","my_var3":"my_val3","my_var4":"my_val4"}'
      ), //extra_vars
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
    )

    const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)
    )
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )

    expect(
      template.validateLaunchRequirements(
        req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
      )
    ).toBeUndefined()
  })

  test('Fail survey validation - some missing variables', async () => {
    const template = new WorkflowJobTemplate(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.template_id,
      {
        my_var: 'my_val',
        my_var3: 'my_val3',
        my_var4: 'my_val4',
        my_var5: 'my_val5'
      }, //extra_vars
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
    )

    const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)
    )
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )

    expect(() => {
      template.validateLaunchRequirements(
        req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
      )
    }).toThrow(Error)
  })

  test('Fail survey validation - extra_vars empty', async () => {
    const template = new WorkflowJobTemplate(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.template_id,
      {}, //extra_vars
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
    )

    const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)
    )
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )

    expect(() => {
      template.validateLaunchRequirements(
        req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
      )
    }).toThrow(Error)
  })

  test('Fail survey validation - extra_vars null', async () => {
    const template = new WorkflowJobTemplate(
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.template_id,
      null, //extra_vars
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
      WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
    )

    const WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_TEMPLATE_REQUIREMENTS)
    )
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.can_start_without_user_input = false
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.survey_enabled = true
    WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK.variables_needed_to_start = [
      'my_var',
      'my_var2',
      'my_var3'
    ]

    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK =
      await template.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )

    expect(() => {
      template.validateLaunchRequirements(
        req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS_ASK
      )
    }).toThrow(Error)
  })
})

describe('Workflow Job Template run function', () => {
  test('Pass run function', async () => {
    const template = new WorkflowJobTemplate(
      ...WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
    )
    const WORKFLOW_JOB_STATUS_DATA_RUNNING = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_STATUS_DATA)
    )

    WORKFLOW_JOB_STATUS_DATA_RUNNING.finished = null

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {
        'x-api-product-name': 'AAP gateway'
      }
    })
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
        // Third call to get Job Status (before loop) (not finished)
        data: WORKFLOW_JOB_STATUS_DATA_RUNNING
      })
      .mockResolvedValueOnce({
        // Fourth call to get job status (in loop) (not finished)
        data: WORKFLOW_JOB_STATUS_DATA_RUNNING
      })
      .mockResolvedValueOnce({
        // Fifth call to get job status (in loop) (not finished)
        data: WORKFLOW_JOB_STATUS_DATA_RUNNING
      })
      .mockResolvedValueOnce({
        // Sixth call to get job status (in loop) (finished)
        data: WORKFLOW_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Seventh call to get workflow nodes
        data: WORKFLOW_JOB_NODES
      })
      .mockResolvedValueOnce({
        // Eighth call to get job status of node one
        data: NODE_ONE_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Ninth call to get job status of node one
        data: NODE_TWO_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Tenth call to get job status of node one
        data: NODE_THREE_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Eleventh call to get job output (first workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })
      .mockResolvedValueOnce({
        // Twelfth call to get job output (second workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })
      .mockResolvedValueOnce({
        // Thirteenth call to get job output (third workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })

    expect(await template.run()).toBeUndefined()
  })

  test('Fail run function', async () => {
    const template = new WorkflowJobTemplate(
      ...WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
    )
    const WORKFLOW_JOB_STATUS_DATA_FAILED = JSON.parse(
      JSON.stringify(WORKFLOW_JOB_STATUS_DATA)
    )

    WORKFLOW_JOB_STATUS_DATA_FAILED.failed = true
    WORKFLOW_JOB_STATUS_DATA_FAILED.status = 'failed'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })
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
        // Third call to get Job Status (before loop) (not finished)
        data: WORKFLOW_JOB_STATUS_DATA_FAILED
      })
      .mockResolvedValueOnce({
        // Fourth call to get workflow nodes
        data: WORKFLOW_JOB_NODES
      })
      .mockResolvedValueOnce({
        // Fifth call to get job status of node one
        data: NODE_ONE_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Sixth call to get job status of node one
        data: NODE_TWO_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Seventh call to get job status of node one
        data: NODE_THREE_JOB_STATUS_DATA
      })
      .mockResolvedValueOnce({
        // Eighth call to get job output (first workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })
      .mockResolvedValueOnce({
        // Ninth call to get job output (second workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })
      .mockResolvedValueOnce({
        // Tenth call to get job output (third workflow node)
        data: JOB_OUTPUT_DATA_ANSI
      })

    await template.run()

    expect(core.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Base API Endpoint should be /api/v2', async () => {
    const template = new WorkflowJobTemplate(
      ...WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
    )

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
    const template = new WorkflowJobTemplate(
      ...WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
    )

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
