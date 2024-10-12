import * as core from '@actions/core'
import axios from 'axios'
import { ControllerApi } from '../src/models/api'

import { CONTROLLER_INSTANCE } from './mock_data/controller'
import {
  JOB_TEMPLATE_DATA,
  WORKFLOW_JOB_TEMPLATE_DATA
} from './mock_data/job_template'
import {
  JOB_TEMPLATE_REQUIREMENTS,
  WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
} from './mock_data/job_requirements'
import {
  JOB_LAUNCH_DATA,
  WORKFLOW_JOB_LAUNCH_DATA
} from './mock_data/job_launch'
import {
  JOB_STATUS_DATA,
  WORKFLOW_JOB_STATUS_DATA
} from './mock_data/job_status'
import {
  JOB_OUTPUT_DATA_ANSI,
  JOB_OUTPUT_DATA_TXT,
  JOB_OUTPUT_DATA_JSON
} from './mock_data/job_output'
import { WORKFLOW_JOB_NODES } from './mock_data/workflow_nodes'

jest.mock('axios')
jest.mock('@actions/core')

jest.spyOn(global, 'setTimeout')

const mockAxios = axios as jest.Mocked<typeof axios>
const mockCore = core as jest.Mocked<typeof core>

mockAxios.create.mockImplementation(() => axios)
mockCore.debug.mockImplementation()

const OLDENV = process.env

beforeEach(() => {
  jest.resetModules()
  process.env = { ...OLDENV }
})

afterAll(() => {
  process.env = OLDENV
})

describe('Testing Controller Initiliaztions', () => {
  test('Controller invalid URL protocol', () => {
    expect(() => {
      new ControllerApi(
        CONTROLLER_INSTANCE.controller_url_invalid_protocol,
        CONTROLLER_INSTANCE.controller_username,
        CONTROLLER_INSTANCE.controller_password,
        CONTROLLER_INSTANCE.controller_token,
        CONTROLLER_INSTANCE.controller_timeout,
        CONTROLLER_INSTANCE.controller_verify_certificate
      )
    }).toThrow(Error)
  })

  test('Controller http protocol', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_http,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    expect(controller).toBe(controller)
  })

  test('Controller missing URL', () => {
    expect(() => {
      new ControllerApi(
        '',
        CONTROLLER_INSTANCE.controller_username,
        CONTROLLER_INSTANCE.controller_password,
        CONTROLLER_INSTANCE.controller_token,
        CONTROLLER_INSTANCE.controller_timeout,
        CONTROLLER_INSTANCE.controller_verify_certificate
      )
    }).toThrow(Error)
  })

  test('Controller URL w/path', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_path,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    expect(controller.controller_url).toEqual(
      CONTROLLER_INSTANCE.controller_url
    )
  })

  test('Controller URL w/slash', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_slash,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )
    expect(controller.controller_url).toEqual(
      CONTROLLER_INSTANCE.controller_url
    )
  })

  test('Controller missing credentials', () => {
    expect(() => {
      new ControllerApi(
        CONTROLLER_INSTANCE.controller_url,
        '',
        '',
        '',
        CONTROLLER_INSTANCE.controller_timeout,
        CONTROLLER_INSTANCE.controller_verify_certificate
      )
    }).toThrow(Error)
  })

  test('Controller specifiy username/password', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_slash,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      '',
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    // Not sure how to test headers since mocking seems to reset any of the headers
    // Leaving here so coverage is 100
    expect(controller).toBe(controller)
  })

  test('Controller specifiy token', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_slash,
      '',
      '',
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    // Not sure how to test headers since mocking seems to reset any of the headers
    // Leaving here so coverage is 100
    expect(controller).toBe(controller)
  })

  test('Controller specifiy action debugging', () => {
    process.env.ACTIONS_STEP_DEBUG = 'true'

    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_http,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    expect(controller).toBe(controller)
    // TODO: How to test onFulfilled and onRejected functions
  })
})

describe('Testing with Job Template Data', () => {
  const controller = new ControllerApi(
    CONTROLLER_INSTANCE.controller_url,
    CONTROLLER_INSTANCE.controller_username,
    CONTROLLER_INSTANCE.controller_password,
    CONTROLLER_INSTANCE.controller_token,
    CONTROLLER_INSTANCE.controller_timeout,
    CONTROLLER_INSTANCE.controller_verify_certificate
  )

  test('Getting launch requirements data', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: JOB_TEMPLATE_REQUIREMENTS
    })

    const req_JOB_TEMPLATE_REQUIREMENTS =
      await controller.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)

    expect(req_JOB_TEMPLATE_REQUIREMENTS).toEqual(JOB_TEMPLATE_REQUIREMENTS)
    expect(req_JOB_TEMPLATE_REQUIREMENTS.job_template_data.id).toEqual(
      JOB_TEMPLATE_DATA.id
    )
  })

  test('Fail getting launch requirements data', async () => {
    mockAxios.get.mockRejectedValueOnce(
      new URIError('Fail getJobTemplateLaunchRequirements')
    )

    await expect(async () => {
      await controller.getJobTemplateLaunchRequirements(JOB_TEMPLATE_DATA.id)
    }).rejects.toThrow(Error)
  })

  test('Getting job status', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: JOB_STATUS_DATA })

    const req_JOB_STATUS_DATA = await controller.getJobStatus(
      JOB_LAUNCH_DATA.id
    )

    expect(req_JOB_STATUS_DATA).toEqual({
      started: JOB_STATUS_DATA.started,
      finished: JOB_STATUS_DATA.finished,
      status: JOB_STATUS_DATA.status,
      failed: JOB_STATUS_DATA.failed
    })
  })

  test('Fail getting job status', async () => {
    mockAxios.get.mockRejectedValueOnce(new URIError('Fail getJobStatus'))

    await expect(async () => {
      await controller.getJobStatus(JOB_LAUNCH_DATA.id)
    }).rejects.toThrow(Error)
  })

  test('Getting job output - ansi', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: JOB_OUTPUT_DATA_ANSI })

    const req_JOB_OUTPUT_DATA_ANSI = await controller.getJobOutput(
      JOB_LAUNCH_DATA.id
    )

    expect(req_JOB_OUTPUT_DATA_ANSI).toEqual(JOB_OUTPUT_DATA_ANSI)
  })

  test('Getting job output - txt', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: JOB_OUTPUT_DATA_TXT })

    const req_JOB_OUTPUT_DATA_TXT = await controller.getJobOutput(
      JOB_LAUNCH_DATA.id,
      'txt'
    )

    expect(req_JOB_OUTPUT_DATA_TXT).toEqual(JOB_OUTPUT_DATA_TXT)
  })

  test('Getting job output - json', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: JOB_OUTPUT_DATA_JSON })

    const req_JOB_OUTPUT_DATA_JSON = await controller.getJobOutput(
      JOB_LAUNCH_DATA.id,
      'json'
    )

    expect(req_JOB_OUTPUT_DATA_JSON).toEqual(JOB_OUTPUT_DATA_JSON)
  })

  test('Fail getting job output - ansi', async () => {
    mockAxios.get.mockRejectedValueOnce(
      new URIError('Fail getJobOutput - ansi')
    )

    await expect(async () => {
      await controller.getJobOutput(JOB_LAUNCH_DATA.id)
    }).rejects.toThrow(Error)
  })

  test('Fail getting job output - txt', async () => {
    mockAxios.get.mockRejectedValueOnce(new URIError('Fail getJobOutput - txt'))

    await expect(async () => {
      await controller.getJobOutput(JOB_LAUNCH_DATA.id, 'txt')
    }).rejects.toThrow(Error)
  })

  test('Launch job template - no payload', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: JOB_LAUNCH_DATA })

    const req_JOB_LAUNCH_DATA = await controller.launchJobTemplate(
      JOB_TEMPLATE_DATA.id,
      {}
    )

    expect(req_JOB_LAUNCH_DATA).toEqual(JOB_LAUNCH_DATA.job)
  })

  test('Fail launch job template - no payload', async () => {
    mockAxios.post.mockRejectedValueOnce(new URIError('Fail launchJobTemplate'))

    await expect(async () => {
      await controller.launchJobTemplate(JOB_TEMPLATE_DATA.id, {})
    }).rejects.toThrow(Error)
  })
})

describe('Testing with Workflow Job Template Data', () => {
  const controller = new ControllerApi(
    CONTROLLER_INSTANCE.controller_url,
    CONTROLLER_INSTANCE.controller_username,
    CONTROLLER_INSTANCE.controller_password,
    CONTROLLER_INSTANCE.controller_token,
    CONTROLLER_INSTANCE.controller_timeout,
    CONTROLLER_INSTANCE.controller_verify_certificate
  )

  test('Getting launch requirements data', async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
    })

    const req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS =
      await controller.getWorkflowJobTemplateLaunchRequirements(
        WORKFLOW_JOB_TEMPLATE_DATA.id
      )

    expect(req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS).toEqual(
      WORKFLOW_JOB_TEMPLATE_REQUIREMENTS
    )
    expect(
      req_WORKFLOW_JOB_TEMPLATE_REQUIREMENTS.workflow_job_template_data.id
    ).toEqual(WORKFLOW_JOB_TEMPLATE_DATA.id)
  })

  test('Fail getting launch requirements data', async () => {
    mockAxios.get.mockRejectedValueOnce(
      new URIError('Fail getWorkflowJobTemplateLaunchRequirements')
    )

    await expect(async () => {
      await controller.getWorkflowJobTemplateLaunchRequirements(
        JOB_TEMPLATE_DATA.id
      )
    }).rejects.toThrow(Error)
  })

  test('Getting workflow job status', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: WORKFLOW_JOB_STATUS_DATA })

    const req_WORKFLOW_JOB_STATUS_DATA = await controller.getWorkflowJobStatus(
      WORKFLOW_JOB_LAUNCH_DATA.id
    )

    expect(req_WORKFLOW_JOB_STATUS_DATA).toEqual({
      started: WORKFLOW_JOB_STATUS_DATA.started,
      finished: WORKFLOW_JOB_STATUS_DATA.finished,
      status: WORKFLOW_JOB_STATUS_DATA.status,
      failed: WORKFLOW_JOB_STATUS_DATA.failed
    })
  })

  test('Fail getting workflow job status', async () => {
    mockAxios.get.mockRejectedValueOnce(
      new URIError('Fail getWorkflowJobStatus')
    )

    await expect(async () => {
      await controller.getWorkflowJobStatus(WORKFLOW_JOB_LAUNCH_DATA.id)
    }).rejects.toThrow(Error)
  })

  test('Getting workflow job nodes', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: WORKFLOW_JOB_NODES })

    const req_WORKFLOW_JOB_NODES = await controller.getWorkflowNodes(
      WORKFLOW_JOB_LAUNCH_DATA.workflow_job
    )

    expect(req_WORKFLOW_JOB_NODES).toEqual(WORKFLOW_JOB_NODES.results)
  })

  test('Fail getting workflow job nodes', async () => {
    mockAxios.get.mockRejectedValueOnce(new URIError('Fail getWorkflowNodes'))

    await expect(async () => {
      await controller.getWorkflowNodes(WORKFLOW_JOB_LAUNCH_DATA.workflow_job)
    }).rejects.toThrow(Error)
  })

  test('Launch workflow job template - no payload', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: WORKFLOW_JOB_LAUNCH_DATA })

    const req_WORKFLOW_JOB_LAUNCH_DATA =
      await controller.launchWorkflowJobTemplate(
        WORKFLOW_JOB_TEMPLATE_DATA.id,
        {}
      )

    expect(req_WORKFLOW_JOB_LAUNCH_DATA).toEqual(
      WORKFLOW_JOB_LAUNCH_DATA.workflow_job
    )
  })

  test('Fail launch workflow job template - no payload', async () => {
    mockAxios.post.mockRejectedValueOnce(
      new URIError('Fail launchWorkflowJobTemplate')
    )

    await expect(async () => {
      await controller.launchWorkflowJobTemplate(
        WORKFLOW_JOB_TEMPLATE_DATA.id,
        {}
      )
    }).rejects.toThrow(Error)
  })
})

describe('Testing miscellaneous functions', () => {
  const controller = new ControllerApi(
    CONTROLLER_INSTANCE.controller_url,
    CONTROLLER_INSTANCE.controller_username,
    CONTROLLER_INSTANCE.controller_password,
    CONTROLLER_INSTANCE.controller_token,
    CONTROLLER_INSTANCE.controller_timeout,
    CONTROLLER_INSTANCE.controller_verify_certificate
  )

  test('Testing sleep function', () => {
    controller.sleep(1)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1)
  })
})
